"use client";
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getorCreateVerificationToken } from "@/lib/token";
import { sendPasswordResetMail } from "@/lib/mail";
import Toast from "../../Toast";
import LoaderCircle from "../../LoaderCircle";
import { tables } from "@/configs/constants";
import { tableTypes } from "@/types/custom";
import { createClient } from "@/utils/supabase/client";
import { getUserByEmail } from "@/Database/database";
import SmallResumeUpload from "../../SmallResumeUpload";
import { BiDownload } from "react-icons/bi";
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
	useEffect(() => {
		const fetchResumeLink = async () => {
			if (session && session.user) {
				if (!session.user.email) return false;
				const { data, error: er } = await getUserByEmail(session.user.email);
				if (data) {
					const user = data as tableTypes["supabaseUser"];
					if (er) {
						console.error(er);
						return;
					}
					const {
						data: resumelink,
						error: e,
					}: {
						data: unknown | null;
						error: any;
					} = await supabase
						.schema("next_auth")
						.from(tables.resumeUserLink)
						.select("*")
						.eq("user_id", user.id)
						.limit(1)
						.maybeSingle();
					console.log("dd");
					if (e) {
						console.error(e);
						return;
					}
					if (!resumelink) {
						setNoPdfUploaded(true);
						return;
					}
					const resumeUser = resumelink as tableTypes["resumeUser"];

					if (
						resumeUser &&
						resumeUser.resume_link &&
						resumeUser.file_name &&
						resumeUser.link_expires_after
					) {
						setPdfFileName(resumeUser?.file_name);
						if (
							new Date(resumeUser.link_expires_after) >
							new Date(new Date().getTime())
						) {
							const { data: link } = await supabase.storage
								.from("jobnest")
								.createSignedUrl(
									`resumes/${resumeUser.file_uuid}`,
									1000 * 60 * 60 * 24
								);
							if (link) {
								setDownloadUrl(link.signedUrl);
								await supabase
									.schema("next_auth")
									.from(tables.resumeUserLink)
									.update({
										resume_link: link.signedUrl,
										link_expires_after: new Date(
											new Date().getTime() + 1000 * 60 * 60 * 24
										),
									})
									.eq("id", resumeUser.id);
							}
						} else {
							setDownloadUrl(resumeUser.resume_link);
						}
					}
				}
			} else {
				return;
			}
		};

		fetchResumeLink();
	}, [session]);
	useEffect(() => {
		const fetchIntroVideoLink = async () => {
			if (session && session.user) {
				if (!session.user.email) return false;
				const { data, error: er } = await getUserByEmail(session.user.email);
				if (data) {
					const user = data as tableTypes["videoLink"];
					if (er) {
						console.error(er);
						return;
					}
					const {
						data: videoLink,
						error: e,
					}: {
						data: unknown | null;
						error: any;
					} = await supabase
						.schema("next_auth")
						.from(tables.videoUserLink)
						.select("*")
						.eq("user_id", user.id)
						.limit(1)
						.maybeSingle();
					if (e) {
						console.error(e);
						return;
					}
					if (!videoLink) {
						return;
					}
					const usersVideo = videoLink as tableTypes["videoLink"];

					if (
						usersVideo &&
						usersVideo.video_link &&
						usersVideo.video_name &&
						usersVideo.expires_in
					) {
						setVideoFileName(usersVideo?.file_name);
						if (
							new Date(usersVideo.expires_in) > new Date(new Date().getTime())
						) {
							const { data: link } = await supabase.storage
								.from("jobnest")
								.createSignedUrl(
									`videos/${usersVideo.file_uuid}`,
									1000 * 60 * 60 * 24
								);
							if (link) {
								setVideoUrl(link.signedUrl);
								await supabase
									.schema("next_auth")
									.from(tables.videoUserLink)
									.update({
										video_link: link.signedUrl,
										expires_in: new Date(
											new Date().getTime() + 1000 * 60 * 60 * 24
										),
									})
									.eq("id", usersVideo.id);
							}
						} else {
							setVideoUrl(usersVideo.video_link);
						}
					}
				}
			} else {
				return;
			}
		};
		fetchIntroVideoLink();
	}, [session]);
	const [pdfFileName, setPdfFileName] = useState("");
	const [downloadUrl, setDownloadUrl] = useState("");
	const [videoFileName, setVideoFileName] = useState("");
	const [videoUrl, setVideoUrl] = useState("");
	const [noPdfUploaded, setNoPdfUploaded] = useState(false);
	const supabase = createClient();
	const [type, settype] = useState<"success" | "error" | "normal" | "warning">(
		"success"
	);
	const [file, setFile]: [File | null, Dispatch<SetStateAction<File | null>>] =
		useState<File | null>(null);
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			setFile(e.target.files[0]);
		}
	};

	return (
		<>
			<Toast
				description={"Password reset link has been sent to your email"}
				type={type}
				controller={toast}
				controllerHandlerBoolean={setToast}
				time={3000}
				loader={null}
			/>
			{session && (
				<main className="w-full grid lg:grid-cols-2 grid-cols-1">
					<div>
						<div className="">
							<div className="w-full mt-8 sm:max-w-xl sm:rounded-lg">
								<h2 className="text-2xl font-bold sm:text-xl">
									Account settings
								</h2>
								<div className="flex flex-col gap-5 mt-10">
									<div className="flex flex-col gap-3">
										<div>Deactivate Account</div>
										<div
											onClick={() => {
												onSubmit();
												setMailSent(true);
											}}
											className="grid w-full p-3  rounded-md text-white  hover:cursor-pointer text-center hover:bg-white transition-all ease-in-out hover:text-black bg-red-600"
										>
											Deactivate account
										</div>
									</div>
									<div className="flex flex-col gap-3">
										<div>Delete Account</div>
										<div
											onClick={() => {
												onSubmit();
												setMailSent(true);
											}}
											className="grid w-full p-3  rounded-md text-white  hover:cursor-pointer text-center hover:bg-white transition-all ease-in-out hover:text-black bg-red-600"
										>
											Delete account
										</div>
									</div>
									<div className="flex flex-col gap-3">
										<div>Change Password</div>
										{mailSent ? (
											<div className=" w-full relative after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-black after:z-[900] z-50 after:opacity-30 after:rounded-lg justify-center items-center gap-1 flex flex-row p-3 rounded-lg hover:cursor-pointer text-center  transition-all ease-in-out  bg-white text-black">
												Sending Mail
												<LoaderCircle />
											</div>
										) : (
											<div
												onClick={() => {
													onSubmit();
													setMailSent(true);
												}}
												className="grid w-full p-3  rounded-md  hover:cursor-pointer text-center hover:bg-white transition-all ease-in-out text-black  bg-white"
											>
												Change password
											</div>
										)}
									</div>
								</div>
							</div>
						</div>
						<div>
							{!noPdfUploaded ? (
								<div className="mb-6 mt-5 max-w-xl text-white">
									<p className="mb-5">Your Resume</p>
									<a
										target="_blank"
										href={downloadUrl}
										rel="noopener noreferrer"
									>
										<div className="w-full gap-2 relative flex z-[1001] items-center flex-row justify-center  p-4 rounded-lg bg-primary-500 hover:bg-primary-700 hover:cursor-pointer">
											<p className="overflow-hidden whitespace-nowrap">
												{pdfFileName}
											</p>
											<BiDownload />
										</div>
									</a>
								</div>
							) : (
								<>
									<p className="pl-1 text-white ">Please upload resume </p>
									<SmallResumeUpload />
								</>
							)}
						</div>
					</div>
					<div className="size-[600px] flex-col flex justify-center items-start gap-6">
						<div className="text-white">Your Intro Video</div>
						<video
							src={videoUrl}
							controls
						/>
					</div>
				</main>
			)}
		</>
	);
};
export default AccountSettings;
