"use client";
import {
	getIconLocation,
	getLoginRoute,
	getTermsRoute,
} from "@/configs/constants";

import Image from "next/image";
import { useEffect, useState } from "react";
import Popup from "../../components/Popup";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Grid } from "react-loader-spinner";
import { set } from "firebase/database";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
import { useSession } from "next-auth/react";
import ReactLoadingSpinner from "@/app/components/reactLoadingSpinner";
export default function Register() {
	type PopupButtonFunctionType = () => any;

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showPopup, setShowPopup] = useState(false);
	const [username, setUsername] = useState("");

	const [signUpClicked, setSignUpClicked] = useState(false);
	const [providerClicked, setProviderClicked] = useState(false);

	const [Popuptext, setPopuptext] = useState("");
	const [PopupTitle, setPopupTitle] = useState("");
	const [PopupButton1, setPopupButton1] = useState("");
	const [PopupButton2, setPopupButton2] = useState("");
	const [PopupButton1Function, setPopupButton1Function] =
		useState<PopupButtonFunctionType>(() => {});
	const [showPopupButton2, setShowPopupButton2] = useState(false);
	const [showPopupButton1, setShowPopupButton1] = useState(false);

	const { status } = useSession({
		required: true,
	});
	const router = useRouter();
	useEffect(() => {
		if (status === "authenticated") {
			router.push("/");
		}
	});
	const handleGoogleSignIn = async () => {
		setProviderClicked(true);
		const googleSignInResponse = await signIn("google", {
			callbackUrl: "/",
		});
		if (googleSignInResponse && !googleSignInResponse.error) {
			router.push("/");
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setSignUpClicked(true);

		const data = new FormData(e.currentTarget as HTMLFormElement);
		if (password !== confirmPassword) {
			setShowPopup(true);
		} else {
			try {
				const signUpResponse = await signIn("custom-signup", {
					redirect: false,
					email: data.get("email") as string,
					password: data.get("password") as string,
					username: username as string,
				});
				setSignUpClicked(false);
				setShowPopup(true);
				setPopupTitle("Account created");
				setPopuptext("Your account has been created successfully.");
				setPopupButton1("Login");
				setPopupButton2("Cancel");
				setPopupButton1Function(() => {
					router.push(getLoginRoute());
				});
				setShowPopupButton1(true);
				setShowPopupButton2(true);
			} catch (error) {
				setPopupTitle("Error occurred");
				setPopuptext(
					`An error occurred while creating your account. Please try again. - ${error}`
				);
				setPopupButton1("Try again");
				setPopupButton2("Cancel");
				setPopupButton1Function(() => setShowPopup(false));
				setShowPopupButton1(true);
				setShowPopupButton2(false);
				setSignUpClicked(false);
				setShowPopup(true);
			}
		}
	};

	return (
		<section className="bg-gray-50 dark:bg-gray-900">
			{showPopup && (
				<Popup
					title={PopupTitle}
					description={Popuptext}
					firstButtonText={PopupButton1}
					secondButtonText={PopupButton2}
					onConfirm={PopupButton1Function}
					showButtonOne={showPopupButton1}
					showButtonTwo={showPopupButton2}
				/>
			)}
			<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ">
				<a
					href="#"
					className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
				>
					<Image
						className=" mr-2"
						src={getIconLocation()}
						alt="logo"
						width={64}
						height={64}
					/>
					JobNest
				</a>
				<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
					<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
						<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
							Create an account
						</h1>
						<form
							onSubmit={handleSubmit}
							className="space-y-4 md:space-y-6"
						>
							<div>
								<label
									htmlFor="email"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Your email
								</label>
								<input
									type="email"
									name="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									id="email"
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="name@company.com"
									required
								/>
							</div>
							<div>
								<label
									htmlFor="Username"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Your Username
								</label>
								<input
									type="Username"
									name="Username"
									value={username}
									onChange={(e) => setUsername(e.target.value)}
									id="Username"
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="Username"
									required
								/>
							</div>
							<div>
								<label
									htmlFor="password"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Password
								</label>
								<input
									type="password"
									name="password"
									id="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									placeholder="••••••••"
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									required
								/>
							</div>
							<div>
								<label
									htmlFor="confirm-password"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Confirm password
								</label>
								<input
									type="confirm-password"
									name="confirm-password"
									id="confirm-password"
									value={confirmPassword}
									onChange={(e) => setConfirmPassword(e.target.value)}
									placeholder="••••••••"
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									required
								/>
							</div>
							<div className="flex items-start">
								<div className="flex items-center h-5">
									<input
										id="terms"
										aria-describedby="terms"
										type="checkbox"
										className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
										required
									/>
								</div>
								<div className="ml-3 text-sm">
									<label
										htmlFor="terms"
										className="font-light text-gray-500 dark:text-gray-300"
									>
										I accept the
										<a
											className="pl-1 font-medium text-primary-600 hover:underline dark:text-primary-500"
											href={getTermsRoute()}
										>
											Terms and Conditions
										</a>
									</label>
								</div>
							</div>
							{signUpClicked ? (
								<ReactLoadingSpinner />
							) : (
								<button
									onSubmit={handleSubmit}
									type="submit"
									className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
								>
									Create an account
								</button>
							)}
						</form>
						<div className="flex items-center justify-center space-x-2">
							<p className="text-sm font-light text-gray-500 dark:text-gray-400">
								Or continue with
							</p>
						</div>
						<div className="flex justify-center items-center ">
							{providerClicked ? (
								<div className="bg-primary-600 flex justify-center items-center hover:bg-primary-700 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5">
									<Grid
										visible={true}
										height="20"
										width="20"
										color="#ffffff"
										ariaLabel="dna-loading"
										wrapperStyle={{}}
										wrapperClass="dna-wrapper"
									/>
								</div>
							) : (
								<ul className="flex w-64  flex-row justify-center items-center gap-10">
									<li className="bg-white p-2 w-10 h-9 flex justify-center items-center rounded-lg">
										<button onClick={handleGoogleSignIn}>
											<FaGoogle className="text-xl" />
										</button>
									</li>
									<li className="bg-white p-2 w-10 h-9 flex justify-center items-center rounded-lg">
										<FaGithub className="text-xl" />
									</li>
									<li className="bg-white p-2 w-10 h-9 flex justify-center items-center rounded-lg">
										<FaFacebook className="text-xl" />
									</li>
								</ul>
							)}
						</div>
						<p className="text-sm font-light text-gray-500 dark:text-gray-400">
							Already have an account?
							<a
								href={getLoginRoute()}
								className="font-medium pl-1 text-primary-600 hover:underline dark:text-primary-500"
							>
								Login here
							</a>
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
