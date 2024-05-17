import { getCheckUsernameRoute } from "@/configs/constants";
import { signIn } from "next-auth/react";
import { Dispatch, SetStateAction } from "react";

export const handleGoogleSignIn = async (
	setgoogleProviderClicked: Dispatch<SetStateAction<boolean>>
) => {
	setgoogleProviderClicked(true);
	const googleSignInResponse = await signIn("google", {
		callbackUrl: getCheckUsernameRoute(),
	});
	if (googleSignInResponse && !googleSignInResponse.error) {
	}
};

export const handleGithubSignIn = async () => {
	console.log("hello");
	// export const googleSignInResponse = await signIn("google", {
	// 	callbackUrl: getCheckUsernameRoute(),
	// });
	// if (googleSignInResponse && !googleSignInResponse.error) {
	// }
};
export const handleSubmit = async (
	e: React.FormEvent,
	setSignInClicked: Dispatch<SetStateAction<boolean>>,
	setShowPopup: Dispatch<SetStateAction<boolean>>
) => {
	e.preventDefault();
	setSignInClicked(true);
	const data = new FormData(e.currentTarget as HTMLFormElement);
	const signInResponse = await signIn("custom-signin", {
		redirect: false,
		email: data.get("email") as string,
		password: data.get("password") as string,
	});
	if (signInResponse && !signInResponse.error) {
		setSignInClicked(false);
	} else {
		setSignInClicked(false);
		setShowPopup(true);
	}
};
