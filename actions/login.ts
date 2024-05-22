import { getCheckUsernameRoute } from "@/configs/constants";
import { LoginActionProps } from "@/types/custom";
import { signIn } from "next-auth/react";
import { Dispatch, SetStateAction } from "react";
export const handleGoogleSignIn = async (
	setgoogleProviderClicked: Dispatch<SetStateAction<boolean>>
) => {
	setgoogleProviderClicked(true);
	await signIn("google", {
		redirect: false,
		callbackUrl: getCheckUsernameRoute(),
	});
};
export const handleGithuSignIn = async (
	setgoogleProviderClicked: Dispatch<SetStateAction<boolean>>
) => {
	setgoogleProviderClicked(true);
	await signIn("github", {
		redirect: false,
		callbackUrl: getCheckUsernameRoute(),
	});
};

export const handleSubmit = async (props: LoginActionProps) => {
	const signInResponse = await signIn("customsignin", {
		redirect: false,
		email: props.email as string,
		password: props.password as string,
	});
	if (signInResponse && !signInResponse.error) {
		return {
			status: "success",
			error: null,
		};
	} else {
		return {
			status: null,
			error: signInResponse?.error || "Network Error",
		};
	}
};
