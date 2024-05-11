"use client";
import { PiPaperclip } from "react-icons/pi";
import { authOptions } from "@/app/api/auth/[...nextauth]/authoptions";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";
import { Dispatch, SetStateAction, use, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { set } from "firebase/database";

export default function Profile() {
	const { data: session, update } = useSession();
	console.log(session);
	const [file, setFile]: [File | null, Dispatch<SetStateAction<File | null>>] =
		useState<File | null>(null);
	const supabase = createClient();
	const uploadFile = async () => {
		if (!file) {
			alert("Please, select file you want to upload");
			return;
		}
		const { data, error } = await supabase.storage
			.from("jobnest")
			.upload(`profileImages/${file.name}`, file);

		if (error) {
			alert(error.message);
			return;
		}
		alert("File uploaded successfully!");

		await supabase
			.schema("next_auth")
			.from("credentials")
			.update({
				avatar: data.path,
			})
			.eq("email", session?.user?.email);
		let pathUrl = data.path;
		const { data: Data } = await supabase.storage
			.from("jobnest")
			.createSignedUrl(pathUrl, 5000);
		update({
			user: {
				...session?.user,
				avatar: Data?.signedUrl,
			},
		}).then((data) => {
			alert("File updated successfully!");
		});
	};
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			setFile(e.target.files[0]);
		}
	};
	return (
		<>
			<div className="bg-[#111827] w-full flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-white">
				<aside className="hidden py-4 md:w-1/3 lg:w-1/4 md:block">
					<div className="sticky flex flex-col gap-2 p-4 text-sm border-r border-indigo-100 top-12">
						<h2 className="pl-3 mb-4 text-2xl font-semibold">Settings</h2>

						<a
							href="#"
							className="flex items-center px-3 py-2.5 font-bold bg-white  text-indigo-900 border rounded-full"
						>
							Pubic Profile
						</a>
						<a
							href="#"
							className="flex items-center px-3 py-2.5 font-semibold  hover:text-indigo-900 hover:border hover:rounded-full"
						>
							Account Settings
						</a>
						<a
							href="#"
							className="flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full  "
						>
							Notifications
						</a>
						<a
							href="#"
							className="flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full  "
						>
							PRO Account
						</a>
					</div>
				</aside>
				<main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
					<div className="p-2 md:p-4">
						<div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
							<h2 className="text-2xl font-bold sm:text-xl">Profile</h2>

							<div className="grid max-w-2xl mx-auto mt-8">
								<div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
									<Image
										className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
										alt="Bordered avatar"
										src={session?.user?.image || session?.user.avatar || ""}
										width={160}
										height={160}
									/>

									<div className="flex flex-col space-y-5 sm:ml-8">
										<form
											onSubmit={(e) => {
												e.preventDefault();
												uploadFile();
											}}
										>
											<input
												type="file"
												onChange={handleChange}
												placeholder="Upload a picture"
											/>
											<button
												type="submit"
												className="py-3.5 px-7 text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200 "
											>
												Upload
											</button>
										</form>
										<button
											type="button"
											className="py-3.5 px-7 text-base font-medium text-indigo-900 focus:outline-none bg-white rounded-lg border border-indigo-200 hover:bg-indigo-100 hover:text-[#202142] focus:z-10 focus:ring-4 focus:ring-indigo-200 "
										>
											Delete picture
										</button>
									</div>
								</div>

								<div className="items-center mt-8 sm:mt-14 text-[#202142]">
									<div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
										<div className="w-full">
											<label
												htmlFor="first_name"
												className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
											>
												Your first name
											</label>
											<input
												type="text"
												id="first_name"
												className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
												placeholder="Your first name"
												value={`${session?.user?.name?.split(" ")[0]}`}
												required
											/>
										</div>

										<div className="w-full">
											<label
												htmlFor="last_name"
												className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
											>
												Your last name
											</label>
											<input
												type="text"
												id="last_name"
												className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
												placeholder="Your last name"
												value={`${session?.user?.name?.split(" ")[1]}`}
												required
											/>
										</div>
									</div>
									<div className="mb-2 sm:mb-6">
										<label
											htmlFor="username"
											className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
										>
											Your username
										</label>
										<input
											type="username"
											id="username"
											disabled
											className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
											value={`${session?.user?.username}`}
											required
										/>
									</div>

									<div className="mb-2 sm:mb-6">
										<label
											htmlFor="email"
											className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
										>
											Your email
										</label>
										<input
											type="email"
											id="email"
											value={`${session?.user?.email}`}
											className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
											placeholder="your.email@mail.com"
											required
										/>
									</div>

									<div className="mb-2 sm:mb-6">
										<label
											htmlFor="profession"
											className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
										>
											Profession
										</label>
										<input
											type="text"
											id="profession"
											className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
											placeholder="your profession"
											required
										/>
									</div>

									<div className="mb-6">
										<label
											htmlFor="message"
											className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
										>
											Bio
										</label>
										<textarea
											id="message"
											rows={4}
											className="block p-2.5 w-full text-sm text-indigo-900 bg-indigo-50 rounded-lg border border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500 "
											placeholder="Write your bio here..."
										></textarea>
									</div>

									<div className="flex justify-end">
										<button
											type="submit"
											className="text-white bg-indigo-700  hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
										>
											Save
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</main>
			</div>
		</>
	);
}
