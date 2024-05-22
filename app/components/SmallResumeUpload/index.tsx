import { useEffect, useState } from "react";
import { Poppins } from "next/font/google";
const poppins = Poppins({
	weight: ["400"],
	subsets: ["latin"],
});
import { v4 as uuidv4 } from "uuid";

import { SetStateAction, Dispatch } from "react";
import { createClient } from "@/utils/supabase/client";
import { useSession } from "next-auth/react";
import { tables } from "@/configs/constants";
import Toast from "../Toast";
import LoaderCircle from "../LoaderCircle";
import LoadingButton from "../LoadingButton";
import { getUserByEmail } from "@/Database/database";
export default function SmallResumeUpload() {
	const [file, setFile]: [File | null, Dispatch<SetStateAction<File | null>>] =
		useState<File | null>(null);
	const [toastHandler, setToastHandler] = useState<boolean>(false);
	const [buttonClicked, setButtonClicked] = useState<boolean>(false);
	const [toastInfo, setToastInfo] = useState<{
		description: string;
		loader: JSX.Element | null;
		type: "success" | "error" | "warning" | "normal";
	}>({
		description: "Saving changes..",
		loader: null,
		type: "success",
	});
	const supabase = createClient();

	const { data: session, update } = useSession();
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
			if (!session.user.email) return;
			const { data: user, error: er } = await getUserByEmail(
				session.user.email
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
					.insert({
						user_id: user.id,
						resume_link: Data.signedUrl,
						link_expires_after: new Date(
							new Date().getTime() + 1000 * 60 * 60 * 24
						),
						file_uuid: unique_file_id,
						file_name: file.name,
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
				setButtonClicked(false);
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
	useEffect(() => {
		console.log(session);
	});
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
			<section
				className={`w-full relative z-[1001]   mx-auto flex-col bg-transparent tet-white  gap-20 h-max flex justify-center p-2 pl-0 items-start  rounded-lg dark  ${poppins.className}`}
			>
				<div className="max-w-sm flex flex-col items-start gap-4 justify-center">
					<label className="block">
						<span className="sr-only">Choose profile photo</span>
						<input
							type="file"
							disabled={buttonClicked}
							accept=".pdf"
							onChange={handleChange}
							className="block w-full text-md text-gray-500
        file:me-4 file:py-4 file:px-6
        file:rounded-lg file:border-0
        file:text-sm file:font-semibold
        file:bg-blue-600 file:text-white
        hover:file:bg-blue-700
        file:disabled:opacity-50 file:disabled:pointer-events-none
        dark:text-white
        dark:file:bg-blue-500
        dark:hover:file:bg-blue-400
      "
						/>
					</label>
					{!buttonClicked ? (
						<button
							onClick={(e) => {
								e.preventDefault();
								setButtonClicked(true);
								uploadFile();
							}}
							className="bg-blue-600 p-5 w-64 h-10 rounded-lg text-white flex justify-center items-center"
						>
							Upload your resume
						</button>
					) : (
						<LoadingButton
							width={64}
							text={"uploading.."}
						/>
					)}
				</div>
			</section>
		</>
	);
}
