import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import LoaderCircle from "../../LoaderCircle";
import { SetStateAction, Dispatch } from "react";
import { createClient } from "@/utils/supabase/client";
import { getaBackendRoute, tables } from "@/configs/constants";
import { getUserByUsername } from "@/Database/database";
import BackgroundGlow from "../../VisualComponents/BackgroundGlow";
import { useInfoAdded } from "../InfoAddingContext";
import { Session } from "next-auth";
import { Id, toast } from "react-toastify";
import ToastTest from "../../ToastWIthoutController";
import CustomToastContainer from "../../CustomToastContainer";
const toastOptions = {
	style: { backgroundColor: `rgb(38 38 38)` },
	className: "border rounded-xl shadow-lg bg-neutral-800 border-neutral-700",
	bodyClassName: " rounded-xl shadow-lg bg-neutral-800",
	autoClose: 3000,
};

export default function VideoUpload({ session }: { session: Session | null }) {
	const [file, setFile]: [File | null, Dispatch<SetStateAction<File | null>>] =
		useState<File | null>(null);

	const [buttonClicked, setButtonClicked] = useState<boolean>(false);
	const supabase = createClient();
	const { isInfoAdded, setIsInfoAdded } = useInfoAdded();

	const uploadFile = async () => {
		const id = toast.loading(
			<ToastTest
				description="Uploading File"
				type={"error"}
				toastProps={toastOptions}
				closeToast={() => {}}
			/>,
			toastOptions
		);
		if (session && session.user && session.user.username) {
			if (!file) {
				setButtonClicked(false);

				toast.update(id, {
					...toastOptions,
					render: (
						<ToastTest
							description="Please select a file"
							type={"error"}
							toastProps={toastOptions}
							closeToast={() => {}}
						/>
					),
					type: "error",
					isLoading: false,
				});
				return;
			}
			const unique_file_id = uuidv4();
			const { data, error } = await supabase.storage
				.from("jobnest")
				.upload(`videos/${unique_file_id}.mp4`, file);
			if (error && error.message.includes("exceeded")) {
				setButtonClicked(false);

				toast.update(id, {
					...toastOptions,
					render: (
						<ToastTest
							description="File size exceeds 50MB"
							type={"error"}
							toastProps={toastOptions}
							closeToast={() => {}}
						/>
					),
					type: "error",
					isLoading: false,
				});
				return;
			}
			if (error) {
				setButtonClicked(false);

				toast.update(id, {
					...toastOptions,
					render: (
						<ToastTest
							description="An error occured while uploading the file. Please try again."
							type={"error"}
							toastProps={toastOptions}
							closeToast={() => {}}
						/>
					),
					type: "error",
					isLoading: false,
				});
				return;
			}
			const { data: user, error: er } = await getUserByUsername(
				session.user.username
			);
			if (er) {
				setButtonClicked(false);

				toast.update(id, {
					...toastOptions,
					render: (
						<ToastTest
							description="An error occured while fetching the user. Please try again."
							type={"error"}
							toastProps={toastOptions}
							closeToast={() => {}}
						/>
					),
					type: "error",
					isLoading: false,
				});

				return Promise.reject("An error occured while fetching the user.");
			}
			if (!user) {
				setButtonClicked(false);

				toast.update(id, {
					...toastOptions,
					render: (
						<ToastTest
							description="An error occured while fetching the user. Please try again."
							type={"error"}
							toastProps={toastOptions}
							closeToast={() => {}}
						/>
					),
					type: "error",
					isLoading: false,
				});

				return Promise.reject("An error occured while fetching the user.");
			}
			let pathUrl = data.path;
			const { data: Data } = await supabase.storage
				.from("jobnest")
				.createSignedUrl(pathUrl, 1000 * 60 * 60 * 24);
			if (Data && Data.signedUrl) {
				const { data, error } = await supabase
					.schema("next_auth")
					.from(tables.videoUserLink)
					.upsert({
						user_id: user?.id,
						video_link: Data.signedUrl,
						expires_in: new Date(new Date().getTime() + 1000 * 60 * 60 * 24),
						video_id: unique_file_id,
						video_name: file.name,
					});
				if (error && error.message.includes("duplicate")) {
					const { data: existingData, error: existingError } = await supabase
						.schema("next_auth")
						.from(tables.videoUserLink)
						.select("*")
						.eq("user_id", user.id)
						.limit(1)
						.maybeSingle();
					console.log(existingData);
					if (existingError) {
						setButtonClicked(false);
						toast.update(id, {
							render: (
								<ToastTest
									description="An error occured while creating the link. Please try again."
									type={"error"}
									toastProps={toastOptions}
									closeToast={() => {}}
								/>
							),
							type: "error",
							isLoading: false,
						});
						return Promise.reject("An error occured while fetching the user.");
					}
					const { data: deletedData, error: err } = await supabase.storage
						.from("jobnest")
						.remove([`introductionVideo/${existingData.file_uuid}.mp4`]);

					const { data, error } = await supabase
						.schema("next_auth")
						.from(tables.videoUserLink)
						.update({
							video_link: Data.signedUrl,
							link_expires_after: new Date(
								new Date().getTime() + 1000 * 60 * 60 * 24
							),
							file_uuid: unique_file_id,
							file_name: file.name,
						})
						.match({
							user_id: user.id,
						});
					if (error) {
						setButtonClicked(false);
						toast.update(id, {
							render: (
								<ToastTest
									description="An error occured while creating the link. Please try again."
									type={"error"}
									toastProps={toastOptions}
									closeToast={() => {}}
								/>
							),
							type: "error",
							isLoading: false,
						});
						return Promise.reject("An error occured while fetching the user.");
					}
				}
				if (error) {
					setButtonClicked(false);

					toast.update(id, {
						render: (
							<ToastTest
								description="An error occured while creating the link. Please try again."
								type={"success"}
								toastProps={toastOptions}
								closeToast={() => {}}
							/>
						),
						type: "error",
						isLoading: false,
					});
					return;
				}
				setIsInfoAdded(true);
				toast.update(id, {
					...toastOptions,
					render: (
						<ToastTest
							description="File uploaded successfully"
							type={"error"}
							toastProps={toastOptions}
							closeToast={() => {}}
						/>
					),
					type: "success",
					isLoading: false,
				});
				return;
			} else {
				setButtonClicked(false);
				toast.update(id, {
					...toastOptions,
					render: (
						<ToastTest
							description="An error occured while creating the link. Please try again."
							type={"error"}
							toastProps={toastOptions}
							closeToast={() => {}}
						/>
					),
					type: "error",
					isLoading: false,
				});
				return;
			}
		} else {
			setButtonClicked(false);
			toast.update(id, {
				render: (
					<ToastTest
						description="An error occured while creating the link. Please try again."
						type={"error"}
						toastProps={toastOptions}
						closeToast={() => {}}
					/>
				),
				type: "error",
				isLoading: false,
			});
			return;
		}
	};
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			setFile(e.target.files[0]);
		}
	};

	return (
		<>
			<CustomToastContainer />
			<div className="relative z-[900] flex flex-col items-center justify-center h-[50vh] bg-transparent">
				<div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-md">
					<h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100">
						Upload Your Introduction Video
					</h1>
					<p className="text-gray-600 dark:text-gray-400 mb-6">
						Upload a short video introduction to showcase your skills and
						personality for the job application.
					</p>
					<div className="space-y-4">
						<div>
							<label
								className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block text-gray-700 dark:text-gray-300 font-medium mb-2"
								htmlFor="video"
							>
								Video (Upto 50MB)
							</label>
							<input
								disabled={buttonClicked}
								accept=".mp4"
								onChange={handleChange}
								className="h-10 border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
								id="video"
								placeholder="Upload your video"
								type="file"
							/>
						</div>
						<button
							onClick={(e) => {
								e.preventDefault();
								setButtonClicked(true);
								uploadFile();
							}}
							className="inline-flex items-center justify-center whitespace-nowrap text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							{!buttonClicked ? (
								"Submit video"
							) : (
								<div className="flex justify-center items-center gap-10">
									Uploading..
									<LoaderCircle />
								</div>
							)}
						</button>
					</div>
				</div>
			</div>
			<BackgroundGlow />
		</>
	);
}
