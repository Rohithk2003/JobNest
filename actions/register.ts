"use server";
import {
	getCheckUsernameRoute,
	getRegisterRoute,
	getUsernameCreationRoute,
} from "@/configs/constants";
import { sendVerificationMail } from "@/lib/mail";
import { getVerificationToken } from "@/lib/token";
import {
	googleSignInProps,
	RegisterActionProps,
	RegisterActionResultProps,
} from "@/types/custom";
import { signIn } from "next-auth/react";
interface registerProps {
	message: string;
}

export const handleSubmit = async (props: RegisterActionProps) => {
	if (props.password !== props.confirmPassword) {
		return {
			status: null,
			error: "Password does not match",
		} as RegisterActionResultProps;
	} else {
		try {
			const res = await fetch("http:localhost:3000/api/auth/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: props.email,
					password: props.password,
					username: props.username,
					confirmPassword: props.confirmPassword,
				}),
			});
			const signUpResponse: registerProps = await res.json();
			console.log(signUpResponse);
			if (signUpResponse?.message.toLowerCase() === "success") {
				const verificationtoken = await getVerificationToken(
					props.email as string
				);
				await sendVerificationMail(props.email as string, verificationtoken);
				return {
					status:
						"Account has been created and a verification mail has been sent to your email. Please verify your email to continue.",
					error: null,
				} as RegisterActionResultProps;
			}
			if (signUpResponse?.message === "User already exists") {
				return {
					status: null,
					error: "User already exists",
				} as RegisterActionResultProps;
			} else if (
				signUpResponse?.message?.includes("network") ||
				signUpResponse?.message?.includes("fetch_message") ||
				signUpResponse?.message?.includes("Server.requestListener") ||
				signUpResponse?.message?.includes("could not")
			) {
				return {
					status: null,
					error: "Network Error",
				} as RegisterActionResultProps;
			}
		} catch (e) {
			console.log(e);
		}
	}
};
export const handleGoogleSignIn = async (props: googleSignInProps) => {
	props.setSignUpStarted(true);
	props.setgoogleProviderClicked(true);
	const googleSignInResponse = await signIn("google", {
		callbackUrl: getCheckUsernameRoute(),
	});
	if (googleSignInResponse && !googleSignInResponse.error) {
		props.router.push(getUsernameCreationRoute());
	}
};
