import { use, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import LoaderCircle from "../../LoaderCircle";
import { SetStateAction, Dispatch } from "react";
import { createClient } from "@/utils/supabase/client";
import { useSession } from "next-auth/react";
import Toast from "../../Toast";
import { tables } from "@/configs/constants";
import { getUserByUsername } from "@/Database/database";
import BackgroundGlow from "../../VisualComponents/BackgroundGlow";
import { useInfoAdded } from "../InfoAddingContext";
import { Session } from "next-auth";
export default function ResumeUpload({ session }: { session: Session | null }) {
	const [file, setFile]: [File | null, Dispatch<SetStateAction<File | null>>] =
		useState<File | null>(null);
	const [toastHandler, setToastHandler] = useState<boolean>(false);
	const [toastInfo, setToastInfo] = useState<{
		description: string;
		loader: JSX.Element | null;
		type: "success" | "error" | "warning" | "normal";
	}>({
		description: "Saving changes..",
		loader: null,
		type: "success",
	});
	const [buttonClicked, setButtonClicked] = useState<boolean>(false);
	const supabase = createClient();
	const { isInfoAdded, setIsInfoAdded } = useInfoAdded();
	useEffect(() => {
		console.log(session);
	});
	const uploadFile = async () => {
		if (session && session.user && session.user.username) {
			if (!file) {
				setButtonClicked(false);
				setToastHandler(true);
				setToastInfo({
					description: "Please select a file.",
					loader: null,
					type: "error",
				});

				return;
			}
			const unique_file_id = uuidv4();
			const { data, error } = await supabase.storage
				.from("jobnest")
				.upload(`resumes/${unique_file_id}`, file);

			if (error) {
				setButtonClicked(false);

				setToastHandler(true);
				setToastInfo({
					description:
						"An error occured while uploading the file. Please try again.",
					loader: null,
					type: "error",
				});
				return;
			}
			console.log(session.user.username);
			const { data: user, error: er } = await getUserByUsername(
				session.user.username
			);
			console.log(user, er);
			let pathUrl = data.path;
			const { data: Data } = await supabase.storage
				.from("jobnest")
				.createSignedUrl(pathUrl, 1000 * 60 * 60 * 24);
			if (Data && Data.signedUrl) {
				const { data, error } = await supabase
					.schema("next_auth")
					.from(tables.resumeUserLink)
					.upsert({
						user_id: user.id,
						resume_link: Data.signedUrl,
						link_expires_after: new Date(
							new Date().getTime() + 1000 * 60 * 60 * 24
						),
						file_uuid: unique_file_id,
						file_name: file.name,
					});
				if (error && error.message.includes("duplicate key value violates")) {
					const { data, error } = await supabase
						.schema("next_auth")
						.from(tables.resumeUserLink)
						.update({
							resume_link: Data.signedUrl,
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

						setToastHandler(true);
						setToastInfo({
							description:
								"An error occured while creating the link. Please try again.",
							loader: null,
							type: "error",
						});
						return;
					}
					setIsInfoAdded(true);
					setToastHandler(true);
					setToastInfo({
						description: "File uploaded successfully.",
						loader: null,
						type: "success",
					});
					setButtonClicked(false);
					return;
				}
				if (error) {
					setButtonClicked(false);

					setToastHandler(true);
					setToastInfo({
						description:
							"An error occured while creating the link. Please try again.",
						loader: null,
						type: "error",
					});
					return;
				}
				setIsInfoAdded(true);
				setToastHandler(true);
				setToastInfo({
					description: "File uploaded successfully.",
					loader: null,
					type: "success",
				});
				return;
			} else {
				setButtonClicked(false);
				setToastHandler(true);
				setToastInfo({
					description:
						"An error occured while creating the link. Please try again.",
					loader: <LoaderCircle />,
					type: "error",
				});
				return;
			}
		}
	};
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			setFile(e.target.files[0]);
		}
	};

	return (
		<>
			<Toast
				description={toastInfo.description}
				type={toastInfo.type}
				controller={toastHandler}
				controllerHandlerBoolean={setToastHandler}
				loader={toastInfo.loader}
				time={3000}
			/>
			<div className="relative z-[900] flex flex-col items-center justify-center h-[50vh] bg-transparent">
				<div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-md">
					<h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100">
						Upload Your Resume
					</h1>
					<p className="text-gray-600 dark:text-gray-400 mb-6">
						Submit your resume for processing. We will keep your resume safe and
						secure.
					</p>
					<div className="space-y-4">
						<div>
							<label
								className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block text-gray-700 dark:text-gray-300 font-medium mb-2"
								htmlFor="resume"
							>
								Resume
							</label>
							<input
								disabled={buttonClicked}
								accept=".pdf"
								onChange={handleChange}
								className="h-10 border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
								id="resume"
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
								"Submit Resume"
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
