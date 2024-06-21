"use client";

import { useEffect, useState } from "react";
import {
	sendPasswordResetMail,
	sendPasswordWithCPasswordResetMail,
} from "@/lib/mail";
import { useSession } from "next-auth/react";
import { getUserByEmail } from "@/Database/database";
import { getorCreateVerificationToken } from "@/lib/token";
import { ErrorAlert, MailSentAlert } from "@/components/Alert";
import LoadingButton from "@/components/LoadingButton";
import BackgroundGlow from "@/components/VisualComponents/BackgroundGlow";
import Navigation from "@/components/MainPage/Navigation";

export default function SendPasswordResetEmailComponent() {
	const [email, setEmail] = useState("");
	const { data: session } = useSession();
	const [mailSent, setMailSent] = useState(false);
	const [timer, setTimer] = useState(120);
	const [error, setError] = useState(false);

	const onsubmit = async () => {
		if (!email) {
			setError(true);
			return;
		}
		setMailSent(true);
		setError(false);
		const { data } = await getUserByEmail(email);

		if (data) {
			const resetToken = await getorCreateVerificationToken(
				data.email as string
			);
			await sendPasswordWithCPasswordResetMail(
				data.email as string,
				resetToken
			);
		}
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
			<Navigation />{" "}
			<main className="relative z-[900] min-h-screen w-full h-full flex flex-col items-center justify-center px-4">
				<div className="max-w-sm w-full text-white space-y-8">
					<div className="text-center">
						<div className="mt-5 space-y-2">
							<h3 className="text-gray-300 text-2xl font-bold sm:text-3xl">
								Change Password
							</h3>
						</div>
					</div>
					<div>
						<label className="font-medium">Email</label>
						<input
							type="email"
							required
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="Email.."
							className="w-full mt-2 px-3 py-2 text-white bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
						/>
					</div>
					{error && (
						<ErrorAlert
							description={"Email is required"}
							heading={"Details not filled"}
							type="error"
							alertHandler={setError}
						/>
					)}
					{mailSent && (
						<MailSentAlert
							heading="Note!"
							text="If your email matches an account, a password reset email will be sent to that email."
						/>
					)}
					{mailSent ? (
						<LoadingButton
							width={96}
							className=""
							text={`Resend email in ${timer} seconds`}
						/>
					) : (
						<button
							onClick={onsubmit}
							className="w-full mt-4 px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
						>
							Send password reset email
						</button>
					)}
				</div>
				<p className="mt-4 text-start text-sm text-zinc-600 dark:text-zinc-300">
					Remember your password?{" "}
					<a
						href="#"
						className="mt-4 text-blue-500 hover:underline"
					>
						Sign in
					</a>
				</p>
			</main>
			<BackgroundGlow />
		</>
	);
}
