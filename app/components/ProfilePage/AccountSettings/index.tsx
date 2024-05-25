"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { getorCreateVerificationToken } from "@/lib/token";
import { sendPasswordResetMail } from "@/lib/mail";
import Toast from "../../Toast";
import LoadingButton from "../../LoadingButton";
import LoaderCircle from "../../LoaderCircle";
const AccountSettings: React.FC<{}> = () => {
	const { data: session } = useSession();
	const [toast, setToast] = useState(false);
	const [mailSent, setMailSent] = useState(false);
	async function onSubmit() {
		if (!session || !session.user || !session.user.email) {
			return;
		}
		const verificationtoken = await getorCreateVerificationToken(
			session.user.email as string
		);
		await sendPasswordResetMail(
			session.user.email as string,
			verificationtoken
		);
		setToast(true);
		setMailSent(false);
	}
	return (
		<>
			<Toast
				description={"Password reset link has been sent to your email"}
				type="success"
				controller={toast}
				controllerHandlerBoolean={setToast}
				time={3000}
				loader={null}
			/>
			<main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
				<div className="p-2 md:p-4">
					<div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
						<h2 className="text-2xl font-bold sm:text-xl">Account settings</h2>
						<div className="grid w-44 p-3 rounded-full hover:bg-white transition-all ease-in-out hover:text-black mt-8 bg-primary-400">
							<button>Delete account</button>
						</div>
						{mailSent ? (
							<div className="mt-10 relative after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-black after:z-[900] z-50 after:opacity-30 after:rounded-full justify-center items-center gap-1 w-44 flex flex-row p-3 rounded-full hover:cursor-pointer text-center  transition-all ease-in-out  bg-primary-900">
								Sending Mail
								<LoaderCircle />
							</div>
						) : (
							<div
								onClick={() => {
									onSubmit();
									setMailSent(true);
								}}
								className="grid w-44 p-3 mt-10 rounded-full hover:cursor-pointer text-center hover:bg-white transition-all ease-in-out hover:text-black  bg-primary-400"
							>
								Change password
							</div>
						)}
					</div>
				</div>
			</main>
		</>
	);
};
export default AccountSettings;
