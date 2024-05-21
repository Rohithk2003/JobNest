"use client";
import {
	getDashboardRoute,
	getIconLocation,
	getLoginRoute,
	getTermsRoute,
	tables,
} from "@/configs/constants";

import Image from "next/image";
import { useEffect, useState } from "react";
import Popup from "../../components/Popup";
import { useRouter } from "next/navigation";
import { TailSpin } from "react-loader-spinner";
import { useSession } from "next-auth/react";
import { createClient } from "@/utils/supabase/client";
import LoadingButton from "@/app/components/reactLoadingSpinner";
import { set } from "firebase/database";
import BackgroundGlow from "@/app/components/VisualComponents/BackgroundGlow";
import Logo from "@/app/components/Logo";

export default function Register() {
	type PopupButtonFunctionType = () => any;

	const supabase = createClient();

	const [userUsername, setuserUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showPopup, setShowPopup] = useState(false);
	const [signUpClicked, setSignUpClicked] = useState(false);

	const [Popuptext, setPopuptext] = useState("");
	const [PopupTitle, setPopupTitle] = useState("");
	const [PopupButton1, setPopupButton1] = useState("");
	const [PopupButton2, setPopupButton2] = useState("");
	const [removeCustomInputTransition, setRemoveCustomInputTransition] =
		useState(false);
	const [PopupButton1Function, setPopupButton1Function] =
		useState<PopupButtonFunctionType>(() => {});
	const [showPopupButton2, setShowPopupButton2] = useState(false);
	const [showPopupButton1, setShowPopupButton1] = useState(false);
	const { data: session, update } = useSession({
		required: true,
		onUnauthenticated() {
			router.push(getLoginRoute());
		},
	});
	const router = useRouter();

	const test = () => {
		setShowPopup(true);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setSignUpClicked(true);

		if (password !== confirmPassword) {
			setShowPopup(true);
		} else {
			try {
				const result = await supabase
					.schema("next_auth")
					.from(tables.supabaseUsers)
					.update({
						username: userUsername,
					})
					.eq("email", session?.user.email ? session.user.email : "");
				if (result.error) {
					throw new Error(result.error.message);
				}
				update({ user: { ...session?.user, username: userUsername } }).then(
					(data) => {
						setSignUpClicked(false);
						setShowPopup(true);
						setPopupTitle("Username created");
						setPopuptext("Success");
						setPopupButton1("Okay");
						setPopupButton2("Cancel");
						setPopupButton1Function(() => {
							window.location.replace(getDashboardRoute());
						});
						setShowPopupButton1(true);
						setShowPopupButton2(true);
					}
				);
			} catch (error) {
				setShowPopup(true);
				setPopupTitle("Error occurred");
				setPopuptext(`Username already exists. Please try again.`);
				setPopupButton1("Try again");
				setPopupButton2("Cancel");
				setShowPopupButton1(false);

				setShowPopupButton2(true);
				setSignUpClicked(false);
			}
		}
	};

	return (
		<>
			<section className="bg-transparent relative z-[400]">
				{showPopup && (
					<Popup
						title={PopupTitle}
						description={Popuptext}
						firstButtonText={PopupButton1}
						secondButtonText={PopupButton2}
						onConfirm={PopupButton1Function}
						showButtonOne={showPopupButton1}
						showPopup={setShowPopup}
						showButtonTwo={showPopupButton2}
					/>
				)}
				<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ">
					<div className="w-full bg-transparent rounded-lg shadow-2xl  h-[400px]  md:mt-0 sm:max-w-md xl:p-0 ">
						<Logo />
						<div className="p-6 space-y-4 md:space-y-6 sm:p-8 gap-5 flex flex-col">
							<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
								Create a username for your account
							</h1>
							<form
								onSubmit={handleSubmit}
								className="flex flex-col gap-8"
							>
								<div className="relative createUsernameForm">
									<input
										type="username"
										name="username"
										value={userUsername}
										onChange={(e) => setuserUsername(e.target.value)}
										onBlur={(e) => {
											setRemoveCustomInputTransition(true);
											if (userUsername === "") {
												setRemoveCustomInputTransition(false);
											}
										}}
										id="username"
										className={`bg-gray-50 border border-gray-300  text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-[#1f2937] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
										required
									/>
									<p
										className={` block mb-5  usernameLabel text-center absolute ${
											!removeCustomInputTransition
												? "top-2.5"
												: "top-[-10px] text-white bg-[#1f2937]"
										} left-4 w-[80px] transition-all duration-300 ease-in-out text-sm font-medium z-[51] text-gray-500 `}
									>
										Username
									</p>
								</div>

								{signUpClicked ? (
									<LoadingButton text="Please wait" />
								) : (
									<button
										onSubmit={handleSubmit}
										type="submit"
										className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
									>
										Create username
									</button>
								)}
							</form>
						</div>
					</div>
				</div>
			</section>
			<BackgroundGlow />
		</>
	);
}
