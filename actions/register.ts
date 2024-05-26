"use server";

import { sendVerificationMail } from "@/lib/mail";
import { getorCreateVerificationToken } from "@/lib/token";
import {
	googleSignInProps,
	RegisterActionProps,
	RegisterActionResultProps,
} from "@/types/custom";
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
			if (signUpResponse?.message.toLowerCase() === "success") {
				return {
					status:
						"Account has been created , you will be redirected please wait...",
					error: null,
				} as RegisterActionResultProps;
			}
			if (signUpResponse?.message === "User already exists") {
				return {
					status: null,
					error:
						"User already exists.If you have created an account using Google Sign In with the same email, please sign in using Google Sign In.",
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
			} else {
				return {
					status: null,
					error: signUpResponse.message,
				} as RegisterActionResultProps;
			}
		} catch (e) {
			console.log(e);
		}
	}
};
