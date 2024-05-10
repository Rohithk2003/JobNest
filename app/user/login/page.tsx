"use client";
import {
	getIconLocation,
	getRegisterRoute,
	getUsernameCreationRoute,
} from "@/configs/constants";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
import Popup from "@/app/components/Popup";
import { DNA, Grid } from "react-loader-spinner";
import { useSession } from "next-auth/react";
import ReactLoadingSpinner from "@/app/components/reactLoadingSpinner";

interface CredentialFormsProps {
	csrfToken?: string;
}

export default function Login(props: CredentialFormsProps) {
	const [errorOccurred, setErrorOccurred] = useState(false);
	const [signInClicked, setSignInClicked] = useState(false);
	const [showPopup, setShowPopup] = useState(false);
	const [providerClicked, setProviderClicked] = useState(false);
	const router = useRouter();
	const { data: session } = useSession({
		required: false,
	});

	useEffect(() => {
		if (session) {
			if ("username" in session.user && session.user.username != null)
				router.push("/");
			else {
				router.push(getUsernameCreationRoute());
			}
		}
	}, [session]);
	const handleGoogleSignIn = async () => {
		setProviderClicked(true);
		const googleSignInResponse = await signIn("google");
		if (googleSignInResponse && !googleSignInResponse.error) {
		}
	};
	const handleSubmit = async (e: React.FormEvent) => {
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
	return (
		<section className="bg-gray-50 dark:bg-gray-900">
			{showPopup && (
				<Popup
					title="User does not exist"
					description="Account with given credentials does not exist.Please create an account"
					firstButtonText="Try again"
					secondButtonText="Cancel"
					onConfirm={() => setShowPopup(false)}
					showButtonOne={true}
					showButtonTwo={false}
				/>
			)}
			<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 mt-[-40px]">
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
							Sign in to your account
						</h1>
						<form
							className="space-y-4 md:space-y-6"
							onSubmit={handleSubmit}
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
									id="email"
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="name@company.com"
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
									placeholder="••••••••"
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									required
								/>
							</div>

							{signInClicked ? (
								<ReactLoadingSpinner />
							) : (
								<button
									type="submit"
									className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
								>
									<span>Sign in</span>
								</button>
							)}

							<p className="text-sm font-light text-gray-500 dark:text-gray-400">
								Don&apos;t have an account yet?
								<a
									href={getRegisterRoute()}
									className="font-medium text-primary-600 hover:underline dark:text-primary-500"
								>
									Sign up
								</a>
							</p>
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
					</div>
				</div>
			</div>
		</section>
	);
}
