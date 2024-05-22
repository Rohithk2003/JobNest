"use client";
import DashboardNavigation from "../components/DashboardNavigation/layout";
import BackgroundGlow from "../components/VisualComponents/BackgroundGlow";
import { useSession } from "next-auth/react";
import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { getUserByEmail } from "@/Database/database";
import newVerification from "@/actions/verification";
import { getDashboardRoute } from "@/configs/constants";
import HandleChangePassword from "@/actions/changepassword";
import AlertWithType, { ErrorAlert } from "../components/Alert";
import LoaderCircle from "../components/LoaderCircle";
import changePasswordTokenVerification from "@/actions/changePasswordTokenVerification";
export default function ChangePassword() {
	const { data: session, status } = useSession();
	const [currentPassword, setCurrentPassword] = useState(false);
	const [loading, setLoading] = useState(true);
	const searchParams = useSearchParams();
	const [error, setError] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string | undefined>(
		undefined
	);
	const [success, setSuccess] = useState<boolean>(false);
	const token = searchParams.get("token");
	const resetParameter = JSON.parse(searchParams.get("reset") ?? "");
	const [password, setPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [updationStarted, setUpdationStarted] = useState(false);
	useEffect(() => {
		const fetchData = async () => {
			const { data, error } = await getUserByEmail(
				session?.user?.email as string
			);
			if (error) {
				console.error("Error fetching user data:", error);
			}
			if (data) {
				if (data.password) {
					setCurrentPassword(true);
				}
			}
		};
		fetchData();
	});
	const [passwordUpdated, setPasswordUpdated] = useState(false);
	const onsubmit = useCallback(async () => {
		if (success || errorMessage) {
			return;
		}
		if (!token) {
			setErrorMessage("no token provided");
		}
		changePasswordTokenVerification(token)
			.then((result) => {
				console.log("f");
				if (result && result.success) {
					setSuccess(true);
					setErrorMessage("");
				} else if (!success && result && result.error) {
					setErrorMessage(result.error);
					setError(true);
				}
				if (errorMessage?.toLowerCase() === "email not verified") {
					setTimeout(() => {
						window.location.href = getDashboardRoute();
					});
				}
				setLoading(false);
			})

			.catch((error) => {
				setErrorMessage("An unexpected error occurred. Please try again.");
				setError(true);
				setTimeout(() => {
					window.location.href = getDashboardRoute();
				}, 1000);
				setLoading(false);
			});
	}, [errorMessage, success, token]);
	const [type, settype] = useState("error");
	useEffect(() => {
		onsubmit();
	}, [token]);
	function handleCurrentPassword() {
		HandleChangePassword({
			currentPassword: password,
			newPassword: newPassword,
			confirmPassword: confirmPassword,
			PasswordAlreadySet: currentPassword && !resetParameter,
			email: session?.user?.email as string,
		}).then((result) => {
			setUpdationStarted(false);
			console.log(result);
			if (result.error) {
				setErrorMessage(result.error);
				setError(true);
				settype("error");
			} else {
				setSuccess(true);
				settype("success");
				setErrorMessage("Password changed successfully");
				setError(false);
				setPasswordUpdated(true);
				setTimeout(() => {
					window.location.href = getDashboardRoute();
				}, 1000);
			}
		});
	}
	return (
		<>
			<DashboardNavigation
				fromMainPage={undefined}
				session={session}
			/>
			{!loading ? (
				<div className="relative z-[1000] bg-transparent min-h-screen flex flex-col items-center justify-center">
					<h1 className="text-3xl font-bold text-zinc-800 dark:text-white mb-8">
						Change Password
					</h1>
					<div className="w-full max-w-md bg-zinc-100 dark:bg-zinc-700 shadow-md rounded px-8 pt-6 pb-8 mb-4">
						{currentPassword && !passwordUpdated && !resetParameter && (
							<div className="mb-4">
								<label
									htmlFor="current-password"
									className="block text-sm font-medium text-zinc-700 dark:text-white mb-2"
								>
									Current Password
								</label>
								<input
									type="password"
									id="current-password"
									value={password}
									disabled={
										errorMessage?.toLowerCase() === "no token provided" ||
										errorMessage?.toLowerCase() === "email not verified"
									}
									onChange={(e) => setPassword(e.target.value)}
									className="form-input mt-1 block w-full px-3 py-2 border rounded-md"
									placeholder="Enter your current password"
								/>
							</div>
						)}
						<div className="mb-4">
							<label
								htmlFor="new-password"
								className="block text-sm font-medium text-zinc-700 dark:text-white mb-2"
							>
								New Password
							</label>
							<input
								type="password"
								id="new-password"
								value={newPassword}
								disabled={
									errorMessage?.toLowerCase() === "no token provided" ||
									errorMessage?.toLowerCase() === "email not verified"
								}
								onChange={(e) => setNewPassword(e.target.value)}
								className="form-input mt-1 block w-full px-3 py-2 border rounded-md"
								placeholder="Enter your new password"
							/>
						</div>
						<div className="mb-6">
							<label
								htmlFor="confirm-password"
								className="block text-sm font-medium text-zinc-700 dark:text-white mb-2"
							>
								Confirm New Password
							</label>
							<input
								type="password"
								id="confirm-password"
								value={confirmPassword}
								disabled={errorMessage?.toLowerCase() === "no token provided"}
								onChange={(e) => setConfirmPassword(e.target.value)}
								className="form-input mt-1 block w-full px-3 py-2 border rounded-md"
								placeholder="Confirm your new password"
							/>
						</div>
						<div className="flex justify-center items-center w-full">
							<button
								onClick={() => {
									setUpdationStarted(true);
									handleCurrentPassword();
								}}
								type="submit"
								className={`${
									errorMessage?.toLowerCase() != "email not verified"
										? "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
										: "mt-10 relative after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-black after:z-[900] z-50 after:opacity-30 after:rounded-full justify-center items-center gap-1 w-44 flex flex-row p-3 rounded-full hover:cursor-pointer text-center  transition-all ease-in-out  bg-primary-900"
								}`}
							>
								{updationStarted ? (
									<div className="flex flex-row w-full gap-4 justify-center items-center">
										Updating Password
										<LoaderCircle />
									</div>
								) : (
									"Update Password"
								)}
							</button>
							{(errorMessage?.toLowerCase() === "no token provided" ||
								errorMessage?.toLowerCase() === "email not verified") && (
								<div className="bg-blue-500 mt-44 hover:bg-blue-700 text-white font-bold py-2 px-4 w-44 text-center rounded focus:outline-none focus:shadow-outline">
									Go to Login
								</div>
							)}
							{errorMessage?.toLowerCase() === "email not verified" && (
								<div>Dashboard</div>
							)}
						</div>
						{error && (
							<div className="text-red-600 ">
								<AlertWithType
									alertHandler={setError}
									type={type}
									heading="Error"
									description={errorMessage ?? ""}
								/>
							</div>
						)}
					</div>
				</div>
			) : (
				<div className="w-full h-screen flex flex-row gap-2 justify-center items-center">
					Verifying your email..Please wait
					<LoaderCircle />
				</div>
			)}
			<BackgroundGlow />
		</>
	);
}
