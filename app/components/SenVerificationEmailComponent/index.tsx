"use client";

import { SetStateAction, useEffect, useState } from "react";
import { getorCreateVerificationToken } from "@/lib/token";
import { getCredentialUserByEmail } from "@/Database/database";
import { sendVerificationMail } from "@/lib/mail";
import { useSession } from "next-auth/react";
import Header from "../MainPage/Navigation/Header";
import Logo from "../Logo";
import { ErrorAlert, MailSentAlert } from "../Alert";
import LoadingButton from "../LoadingButton";
import BackgroundGlow from "../VisualComponents/BackgroundGlow";

export default function SendVerificationEmailComponent() {
	const [username, setUsername] = useState("");
	const { data: session } = useSession();
	const [mailSent, setMailSent] = useState(false);
	const [timer, setTimer] = useState(120);
	const [error, setError] = useState(false);
	const onsubmit = async () => {
		if (!username) {
			setError(true);
			return;
		}
		setMailSent(true);
		setError(false);
		const { data } = await getCredentialUserByEmail(username);

		const verificationtoken = await getorCreateVerificationToken(
			data.email as string
		);
		await sendVerificationMail(data.email as string, verificationtoken);
	};
	useEffect(() => {
		let interval: any;
		if (mailSent) {
			interval = setInterval(() => {
				setTimer((prev) => prev - 1);
			}, 1000);
		}
		if (timer === 0) {
			setMailSent(false);
			setTimer(120);
			clearInterval(interval);
		}
		return () => {
			clearInterval(interval);
		};
	}, [mailSent, timer]);
	return (
		<>
			<main className="relative z-[900] w-full h-full flex flex-col items-center justify-center px-4">
				<div className="max-w-sm w-full text-white space-y-8">
					<div className="text-center">
						<div className="mt-5 space-y-2">
							<h3 className="text-gray-300 text-2xl font-bold sm:text-3xl">
								Email verification
							</h3>
						</div>
					</div>
					<div>
						<label className="font-medium">Username</label>
						<input
							type="Username"
							required
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							placeholder="Username.."
							className="w-full mt-2 px-3 py-2 text-white bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
						/>
					</div>
					{error && (
						<ErrorAlert
							description={"Username is required"}
							heading={"Details not filled"}
							type="error"
							alertHandler={setError}
						/>
					)}
					{mailSent && (
						<MailSentAlert
							heading="Note!"
							text="If your username matches to an account, a verification email will
						be sent to your registered email address."
						/>
					)}
					{mailSent ? (
						<LoadingButton text={`Resend email in ${timer} seconds`} />
					) : (
						<button
							onClick={onsubmit}
							className="w-full mt-4 px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
						>
							Send verification email
						</button>
					)}
				</div>
			</main>
			<BackgroundGlow />
		</>
	);
}
