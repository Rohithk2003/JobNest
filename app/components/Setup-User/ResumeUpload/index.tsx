import { useEffect, useState } from "react";
import { Poppins } from "next/font/google";
const poppins = Poppins({
	weight: ["400"],
	subsets: ["latin"],
});
import { v4 as uuidv4 } from "uuid";

import LoaderCircle from "../../LoaderCircle";
import { SetStateAction, Dispatch } from "react";
import { createClient } from "@/utils/supabase/client";
import { useSession } from "next-auth/react";
import Toast from "../../Toast";
import { tables } from "@/configs/constants";
import { getCredentialUserByUsername } from "@/Database/database";
export default function ResumeUpload() {
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
	const supabase = createClient();
	const { data: session, update } = useSession();
	const uploadFile = async () => {
		if (session && session.user && session.user.username) {
			if (!file) {
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
				setToastHandler(true);
				setToastInfo({
					description:
						"An error occured while uploading the file. Please try again.",
					loader: null,
					type: "error",
				});
				return;
			}

			const { data: user, error: er } = await getCredentialUserByUsername(
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
					setToastHandler(true);
					setToastInfo({
						description:
							"An error occured while creating the link. Please try again.",
						loader: null,
						type: "error",
					});
					return;
				}
				setToastHandler(true);
				setToastInfo({
					description: "File uploaded successfully.",
					loader: null,
					type: "success",
				});
				return;
			} else {
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
				className={`w-full p-6 mx-auto flex-col bg-transparent tet-white  gap-20 h-[50vh] flex justify-start items-center  rounded-lg dark mt-20 ${poppins.className}`}
			>
				<div className="text-5xl text-white">Upload resume</div>
				<div className="max-w-sm">
					<form
						onSubmit={(e) => {
							e.preventDefault();
							uploadFile();
						}}
						className="flex justify-center items-center flex-col gap-20"
					>
						<label className="block">
							<span className="sr-only">Choose profile photo</span>
							<input
								type="file"
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
						<button className="bg-blue-600 p-5 w-32 h-10 mt-5 rounded-lg text-white flex justify-center items-center">
							Upload
						</button>
					</form>
				</div>
			</section>
		</>
	);
}
