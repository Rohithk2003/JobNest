"use client";
import { PiPaperclip } from "react-icons/pi";
import { authOptions } from "@/app/api/auth/[...nextauth]/authoptions";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";
import {
	Dispatch,
	SetStateAction,
	use,
	useEffect,
	useRef,
	useState,
} from "react";
import { useSession } from "next-auth/react";
import { set } from "firebase/database";
import BackgroundGlow from "@/app/components/VisualComponents/BackgroundGlow";
import DashboardNavigation from "../../components/DashboardNavigation/layout";
import { SkeletonCard } from "@/app/components/Loader/JobListCardSkeleton";
import ProfileImageSkeleton from "@/app/components/Loader/ProfileImageSkeleton";
import { BiEdit } from "react-icons/bi";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import { RevolvingDot, ThreeCircles } from "react-loader-spinner";
import { SupabaseUpdateProps, UserProps } from "@/types/custom";
import Popup from "@/app/components/Popup";

export default function Profile() {
	const { data: session, update } = useSession();
	const [formData, setFormData] = useState({
		first_name: "",
		last_name: "",
		username: "",
		email: "",
		cgpa: 0.0,
		bio: "",
	});
	const [showEdtImage, setShowEdtImage] = useState(false);
	const [file, setFile]: [File | null, Dispatch<SetStateAction<File | null>>] =
		useState<File | null>(null);
	const supabase = createClient();
	const [sessionLoaded, setSessionLoaded] = useState(false);
	const [showPopup, setShowPopup] = useState({
		show: false,
		title: "",
		description: "",
	});
	const [profileData, setProfileData] = useState<UserProps | null>();
	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const { first_name, last_name, email, username, cgpa, bio } = formData;
		const name = `${first_name} ${last_name}`;
		const response = await supabase
			.schema("next_auth")
			.from("users")
			.update({ name, username, cgpa, bio })
			.eq("email", email);
		if (response.error) {
			setShowPopup({
				show: true,
				title: "User does not exist",
				description:
					"Account with given credentials does not exist.Please create an account",
			});
		} else {
			setShowPopup({
				show: true,
				title: "Success",
				description:
					"Your profile has been updated successfully. Please refresh the page to see the changes.",
			});
		}
	}

	useEffect(() => {
		if (!sessionLoaded && session) {
			const fetchData = async () => {
				const { data, error } = await supabase
					.schema("next_auth")
					.from("users")
					.select("*")
					.eq("email", session?.user?.email);
				setProfileData(data && data[0]);
			};
			fetchData();
			if (profileData) {
				setSessionLoaded(true);
				console.log(profileData);
				formData.first_name = profileData?.name?.split(" ")[0] || "";
				formData.last_name = profileData?.name?.split(" ")[1] || "";
				formData.username = profileData?.username || "";
				formData.email = profileData?.email || "";
				formData.cgpa = profileData?.cgpa || 0.0;
				formData.bio = profileData?.bio || "";
			}
		}
	}, [session, profileData]);
	const uploadFile = async () => {
		if (!file) {
			alert("Please, select file you want to upload");
			return;
		}
		const { data, error } = await supabase.storage
			.from("jobnest")
			.upload(`profileImages/${file.name}`, file);

		if (error) {
			setShowPopup({
				show: true,
				title: "Error",
				description:
					"An error occured while uploading the file. Please try again.",
			});
			return;
		}
		setShowPopup({
			show: true,
			title: "Success",
			description:
				"Your profile has been updated successfully. Please re login.",
		});

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
			<DashboardNavigation fromMainPage={undefined} />
			{showPopup.show && (
				<Popup
					title={showPopup.title}
					description={showPopup.description}
					firstButtonText="Okay"
					secondButtonText="Cancel"
					showButtonOne={true}
					showButtonTwo={false}
					onConfirm={() => {
						setShowPopup({
							show: false,
							title: "",
							description: "",
						});
					}}
					showPopup={() => {
						setShowPopup({
							show: false,
							title: "",
							description: "",
						});
					}}
				/>
			)}
			{sessionLoaded ? (
				<>
					<div className="bg-transparent w-full relative z-[400] flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-white">
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
									Pro Account
								</a>
							</div>
						</aside>
						<main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
							<div className="p-2 md:p-4">
								<div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
									<h2 className="text-2xl font-bold sm:text-xl">Profile</h2>

									<div className="grid max-w-2xl mx-auto mt-8">
										<div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
											{session?.user?.image || session?.user.avatar ? (
												<div className="relative ">
													<Image
														className="avatar object-cover z-30 w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
														alt="Bordered avatar"
														src={
															session?.user?.image || session?.user.avatar || ""
														}
														width={160}
														height={160}
													/>
													<div className="w-full h-full z-50 avatar-overlay bg-black opacity-50 hidden absolute top-0 left-0 rounded-full">
														<div className="flex items-center justify-center w-full h-full">
															<MdEdit
																onClick={() => {
																	setShowEdtImage(!showEdtImage);
																}}
																className="text-gray-600 hover:cursor-pointer hover:text-white text-2xl"
															/>
															{session?.user.provider != "google" && (
																<MdDeleteOutline className="text-gray-600 hover:text-white text-2xl" />
															)}
														</div>
													</div>
												</div>
											) : (
												<ProfileImageSkeleton />
											)}
											{showEdtImage && (
												<div className="flex flex-col space-y-5 sm:ml-8">
													<form
														onSubmit={(e) => {
															e.preventDefault();
															uploadFile();
														}}
													>
														<input
															type="file"
															className="file-input w-full max-w-xs"
															onChange={handleChange}
															accept="image/*"
														/>
														{file && (
															<button
																type="submit"
																className="py-3.5 px-7 text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200 "
															>
																Upload
															</button>
														)}
													</form>
													{session?.user.provider != "google" && (
														<button
															type="button"
															className="py-3.5 px-7 text-base font-medium text-indigo-900 focus:outline-none bg-white rounded-lg border border-indigo-200 hover:bg-indigo-100 hover:text-[#202142] focus:z-10 focus:ring-4 focus:ring-indigo-200 "
														>
															Delete picture
														</button>
													)}
												</div>
											)}
										</div>

										<form
											onSubmit={handleSubmit}
											name="form"
										>
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
															name="first_name"
															onChange={(e) => {
																setFormData({
																	...formData,
																	first_name: e.target.value,
																});
															}}
															className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
															placeholder="Your first name"
															value={formData.first_name}
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
															name="last_name"
															className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
															placeholder="Your last name"
															value={formData.last_name}
															onChange={(e) => {
																setFormData({
																	...formData,
																	last_name: e.target.value,
																});
															}}
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
														disabled={session?.user?.provider == "google"}
													/>
												</div>
												<div className="mb-2 sm:mb-6">
													<label
														htmlFor="cgpa"
														className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
													>
														cgpa
													</label>
													<input
														type="text"
														name="cgpa"
														id="cgpa"
														value={formData.cgpa}
														onChange={(e) => {
															if (/^\d*\.?\d*$/.test(e.target.value)) {
																setFormData({
																	...formData,
																	cgpa: parseFloat(e.target.value),
																});
															}
														}}
														className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
														placeholder="your cgpa"
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
														name="message"
														value={formData.bio}
														onChange={(e) => {
															setFormData({
																...formData,
																bio: e.target.value,
															});
														}}
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
										</form>
									</div>
								</div>
							</div>
						</main>
					</div>
				</>
			) : (
				<div className="w-screen h-screen -mt-16 flex justify-center items-center gap-10">
					<RevolvingDot
						visible={true}
						height="100"
						width="100"
						color="#4fa94d"
						wrapperStyle={{}}
						wrapperClass=""
					/>
					<p>Loading</p>
				</div>
			)}
			<BackgroundGlow />
		</>
	);
}
