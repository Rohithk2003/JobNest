"use client";

import newVerification from "@/actions/verification";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { CirclesWithBar } from "react-loader-spinner";
import { ErrorAlert, SuccessAlert } from "../Alert";

export default function VerifyEmailForm() {
	const searchParams = useSearchParams();
	const token = searchParams.get("token");
	const [message, setMessage] = useState("Verifying your email...");
	const [error, setError] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string | undefined>(
		undefined
	);
	const [success, setSuccess] = useState<boolean>(false);
	const onsubmit = useCallback(async () => {
		if (success || errorMessage) {
			return;
		}
		if (!token) {
			setErrorMessage("no token provided");
		}
		newVerification(token)
			.then((result) => {
				if (result && result.success) {
					setSuccess(true);
					setMessage("Email verified successfully.Redirecting...");
					setTimeout(() => {
						window.location.href = "/login";
					}, 1000);
				} else if (!success && result && result.error) {
					setErrorMessage(result.error);
					setError(true);
				}
			})
			.catch((error) => {
				setErrorMessage("An unexpected error occurred. Please try again.");
				setError(true);
			});
	}, [errorMessage, success, token]);
	useEffect(() => {
		onsubmit();
	}, [token]);
	return (
		<div className="w-full h-screen flex justify-center items-center">
			<div className="w-full max-w-md p-8 bg-slate-800 rounded-lg shadow-md">
				<h2 className="text-center text-2xl font-semibold text-indigo-600">
					Verify Your Email
				</h2>
				<p className="text-center mt-2">
					Please click the button below to verify your email address.
				</p>
				<div className="mt-4 flex justify-center">
					{errorMessage?.toLowerCase() === "email already verified" ? (
						<div
							onClick={() => {
								window.location.href = "/dashboard";
							}}
							className="hover:scale-110 tranisition-all ease-in-out duration-300 hover:cursor-pointer inline-flex items-center border border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 justify-center rounded-md py-2 px-4 bg-indigo-600 text-sm font-medium text-white shadow-sm"
						>
							Go to Dashboard
						</div>
					) : (
						<button
							disabled={success || error == false}
							className="inline-flex items-center border border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 justify-center rounded-md py-2 px-4 bg-indigo-600 text-sm font-medium text-white shadow-sm"
							type="button"
						>
							Resend Verify Email
						</button>
					)}
				</div>
				{message && !error && !success && (
					<div className="mt-4 text-center flex justify-center items-center">
						<div className="text-indigo-600 flex flex-rwo gap-2">
							<div>
								{!success ? (
									message
								) : (
									<SuccessAlert
										heading={"Success"}
										description={message}
										type="success"
										alertHandler={setSuccess}
									/>
								)}
							</div>
							<CirclesWithBar
								color="#6366F1"
								width={30}
								height={30}
							/>
						</div>
					</div>
				)}
				{error && (
					<ErrorAlert
						type="error"
						alertHandler={setError}
						heading={"Error"}
						description={errorMessage || "An unexpected error occurred"}
					/>
				)}
			</div>
		</div>
	);
}
