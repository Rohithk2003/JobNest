"use client";
import Image from "next/image";
import { MdAccountCircle, MdDeleteOutline, MdEdit } from "react-icons/md";
import ProfileImageSkeleton from "../../Loader/ProfileImageSkeleton";
import { tableTypes, UserProps } from "@/types/custom";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { getaBackendRoute, tables } from "@/configs/constants";
import { BiDownload } from "react-icons/bi";
import SmallResumeUpload from "../../SmallResumeUpload";
import { useSession } from "next-auth/react";
import { getUserByEmail } from "@/Database/database";
import { PostgrestError } from "@supabase/supabase-js";
import Toast from "../../Toast";
import Loading from "@/app/loading";
import LoadingButton from "../../LoadingButton";
import { sendVerificationMail } from "@/lib/mail";
import LoaderCircle from "../../LoaderCircle";
import { getorCreateVerificationToken } from "@/lib/token";

const ProfileComponent = ({}) => {
	const [countryDropdown, showcountryDropdown] = useState(false);
	const [genderDropdown, showgenderDropdown] = useState(false);
	const [toastHandler, setToastHandler] = useState(false);
	const supabase = createClient();
	const [sessionLoaded, setSessionLoaded] = useState(false);
	const [description, setDescription] = useState("");
	const [type, settype] = useState<"success" | "error" | "normal" | "warning">(
		"success"
	);
	const [emailVerified, setEmailVerified] = useState(false);
	const { data: session, update } = useSession();
	const [formData, setFormData] = useState({
		first_name: "",
		last_name: "",
		username: "",
		email: "",
		cgpa: 0.0,
		bio: "",
		country: "Select country",
		gender: "Select your gender",
		age: 21,
		dob: new Date(),
		address: "",
		city: "",
		state: "",
		zip_code: "",
		interests: [],
	});
	const [profileData, setProfileData] = useState<UserProps | null>();
	const [mailsent, setMailSent] = useState(false);
	const [showEdtImage, setShowEdtImage] = useState(false);
	const [file, setFile]: [File | null, Dispatch<SetStateAction<File | null>>] =
		useState<File | null>(null);
	const [error, seterror] = useState<PostgrestError | null>();
	const [saving, setSaving] = useState(false);
	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const name = `${formData.first_name} ${formData.last_name}`;
		const { first_name, last_name, ...rest } = formData;
		const response = await supabase
			.schema("next_auth")
			.from(tables.supabaseUsers)
			.update({ name, ...rest })
			.eq("email", formData.email);
		update({
			user: {
				...session?.user,
				username: formData.username,
			},
		});
		if (response.error) {
			setToastHandler(true);
			setDescription(
				response.error.message ||
					"An error occured while updating your profile."
			);
			settype("error");
		} else {
			setSaving(false);
			setToastHandler(true);
			setDescription(
				"Your profile has been updated successfully. Please refresh the page to see the changes."
			);
			settype("success");
		}
	}

	useEffect(() => {
		if (!sessionLoaded && session) {
			const fetchData = async () => {
				const { data, error } = await supabase
					.schema("next_auth")
					.from(tables.supabaseUsers)
					.select("*")
					.eq("email", session?.user?.email);
				setProfileData(data && data[0]);
				seterror(error);
			};
			fetchData();
			if (profileData) {
				setSessionLoaded(true);
				formData.first_name = profileData?.name?.split(" ")[0] || "";
				formData.last_name = profileData?.name?.split(" ")[1] || "";
				formData.username = profileData?.username || "";
				formData.email = profileData?.email || "";
				formData.cgpa = profileData?.cgpa || 0.0;
				formData.bio = profileData?.bio || "";
				formData.country = profileData?.country || "";
				formData.gender = profileData?.gender || "";
				formData.address = profileData?.address || "";
				formData.age = profileData?.age || 0;
				formData.state = profileData?.state || "";
				formData.city = profileData?.city || "";
				formData.zip_code = profileData?.zip_code || "";
				setEmailVerified(profileData?.emailVerified || false);
			}
		}
	}, [session, profileData]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			setFile(e.target.files[0]);
		}
	};

	const profilePhotoUploader = async () => {
		if (!file) {
			alert("Please, select file you want to upload");
			return;
		}
		const { data, error } = await supabase.storage
			.from("jobnest")
			.upload(`profileImages/${file.name}`, file);

		if (error) {
			setToastHandler(true);
			setDescription(
				"An error occured while uploading the file. Please try again."
			);
			settype("error");
			return;
		}
		setToastHandler(true);
		setDescription("File uploaded successfully.");
		settype("success");
		await supabase
			.schema("next_auth")
			.from(tables.supabaseUsers)
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
	async function sendVerifyEmail() {
		if (!session || !session.user || !session.user.email) {
			setMailSent(false);
			return;
		}
		const verificationtoken = await getorCreateVerificationToken(
			session.user.email as string
		);
		await sendVerificationMail(
			session.user.email as string,
			verificationtoken ?? ""
		);
		setToastHandler(true);
		setDescription("Verification email sent successfully.");
		settype("success");
		setMailSent(false);
	}
	return (
		<>
			<Toast
				description={description}
				time={3000}
				type={type}
				controller={toastHandler}
				controllerHandlerBoolean={setToastHandler}
				loader={null}
			/>

			{sessionLoaded ? (
				<main className="w-full min-h-screen py-1 overflow-y-hidden">
					<form
						onSubmit={(e) => {
							handleSubmit(e);
							setSaving(true);
						}}
						name="form"
					>
						<div className="p-2 md:p-4 ">
							<div className="w-full px-6 pb-8 mt-8 sm:rounded-lg">
								<h2 className="text-2xl font-bold sm:text-xl">Profile</h2>
								<div className="grid md:grid-cols-3 grid-cols-1 md:grid-rows-1 grid-rows-2 w-full mt-8 gap-0">
									<div className="flex flex-col justify-start items-start ">
										<div className="flex flex-col">
											{session?.user ? (
												<div className="relative ">
													{session?.user?.image ? (
														<Image
															className="avatar object-cover z-30 w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
															alt="Bordered avatar"
															src={session?.user?.image || ""}
															width={160}
															height={160}
														/>
													) : (
														<MdAccountCircle
															className="avatar object-cover z-30 w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
															width={160}
															height={160}
														/>
													)}
												</div>
											) : (
												<ProfileImageSkeleton />
											)}
											<div className="flex flex-col ml-3 gap-2 justify-center items-center mt-10">
												<div>
													<input
														type="file"
														className="file-input w-32 h-10 "
														onChange={handleChange}
														accept="image/*"
													/>
													{file && (
														<button
															onSubmit={(e) => {
																e.preventDefault();
																profilePhotoUploader();
															}}
															type="submit"
															className="p-2 w-32 h-10  text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-inwhite focus:z-10 focus:ring-4 focus:ring-indigo-200 "
														>
															Upload
														</button>
													)}
												</div>
												<button
													type="button"
													className="p-2 w-32 h-10  text-base font-medium text-inwhite focus:outline-none text-black bg-white rounded-lg border border-indigo-200 hover:bg-indigo-100 hover:text-[#202142] focus:z-10 focus:ring-4 focus:ring-indigo-200 "
												>
													Delete picture
												</button>
											</div>
										</div>
									</div>

									<div className="grid col-span-2 grid-cols-1 gap-4">
										<div className="  text-[#202142]">
											<div className=" flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
												<div className="w-full relative z-[1000]">
													<label
														htmlFor="first_name"
														className="block mb-2 text-sm font-medium text-inwhite dark:text-white"
													>
														First name
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
														className=" bg-transparent text-white border border-indigo-300 text-inwhite text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
														placeholder="First name"
														value={formData.first_name}
														required
													/>
												</div>
												<div className="w-full  relative z-[1000]">
													<label
														htmlFor="last_name"
														className="block mb-2 text-sm font-medium text-inwhite dark:text-white"
													>
														Last name
													</label>
													<input
														type="text"
														id="last_name"
														name="last_name"
														className=" bg-transparent text-white border border-indigo-300 text-inwhite text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
														placeholder="Last name"
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
											<div className="mb-2 sm:mb-6  relative z-[1000]">
												<label
													htmlFor="username"
													className="block mb-2 text-sm font-medium text-inwhite dark:text-white"
												>
													Username
												</label>
												<input
													type="username"
													id="username"
													className=" bg-transparent text-white border border-indigo-300 text-inwhite text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
													value={formData.username ?? ""}
													onChange={(e) => {
														setFormData({
															...formData,
															username: e.target.value,
														});
													}}
													required
												/>
											</div>
											<div className="relative w-full z-[901] mb-2 sm:mb-6 text-white ">
												<div>Gender</div>
												<div
													onClick={() => {
														showgenderDropdown(!genderDropdown);
													}}
													className="inline-flex hover:cursor-pointer mt-2 p-1.5  pl-0 justify-between w-full items-center overflow-hidden rounded-md border bg-transparent  border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500"
												>
													<div className="bg-transparent  px-4 py-2 pl-2 text-sm/none  border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500">
														{formData.gender}
													</div>

													<div className="h-full p-2 text-gray-600 bg-transparent  hover:text-gray-700 dark:text-gray-300  dark:hover:text-gray-200">
														<span className="sr-only">Menu</span>
														<svg
															xmlns="http://www.w3.org/2000/svg"
															className="h-4 w-4"
															viewBox="0 0 20 20"
															fill="currentColor"
														>
															<path
																fillRule="evenodd"
																d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
																clipRule="evenodd"
															/>
														</svg>
													</div>
												</div>

												<div
													className={`absolute end-0 z-[900] mt-2 w-full right-0 rounded-md border ring-indigo-500 bg-gray-900  border-indigo-300 shadow-lg  ${
														genderDropdown
															? "opacity-1 translate-y-0"
															: "opacity-0 translate-y-[-200%]"
													} transition ease-in-out duration-300 `}
													role="menu"
												>
													<div className="p-2">
														<div
															onClick={() => {
																setFormData((prev) => ({
																	...prev,
																	gender: "Male",
																}));
																showgenderDropdown(false);
															}}
															className="block rounded-lg px-4 py-2 text-sm text-white hover:bg-gray-50 hover:text-gray-700  dark:hover:bg-gray-800 dark:hover:text-gray-300"
															role="menuitem"
														>
															Male
														</div>

														<div
															onClick={() => {
																setFormData((prev) => ({
																	...prev,
																	gender: "Female",
																}));
																showgenderDropdown(false);
															}}
															className="block rounded-lg px-4 py-2 text-sm text-white hover:bg-gray-50 hover:text-gray-700  dark:hover:bg-gray-800 dark:hover:text-gray-300"
															role="menuitem"
														>
															Female
														</div>

														<div
															onClick={() => {
																setFormData((prev) => ({
																	...prev,
																	gender: "Other",
																}));
																showgenderDropdown(false);
															}}
															className="block rounded-lg px-4 py-2 text-sm text-white hover:bg-gray-50 hover:text-gray-700  dark:hover:bg-gray-800 dark:hover:text-gray-300"
															role="menuitem"
														>
															Other
														</div>
													</div>
												</div>
											</div>
											<div className="flex flex-row justify-end items-center gap-5">
												<div className="mb-2 sm:mb-6 flex-1">
													<label
														htmlFor="email"
														className="block mb-2 text-sm font-medium text-white dark:text-white"
													>
														Email
													</label>
													<input
														type="email"
														id="email"
														value={`${session?.user?.email}`}
														className=" bg-transparent text-white border border-indigo-300  text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
														placeholder="your.email@mail.com"
														required
														disabled={session?.user?.provider == "google"}
													/>
												</div>
												{!emailVerified && (
													<div
														onClick={() => {
															setMailSent(true);
															sendVerifyEmail();
														}}
														className={`${
															!mailsent ? "bg-primary-600" : "bg-primary-900"
														}  gap-2 flex-row flex-shrink-0 flex relative justify-center items-center hover:bg-primary-700 focus:outline-none text-white focus:ring-primary-300 font-medium rounded-lg text-sm w-32 hover:cursor-pointer h-max p-2.5`}
													>
														{mailsent ? (
															<div className="relative after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-black after:z-[900] z-50 after:opacity-30 after:rounded-full justify-center items-center gap-1 flex flex-row  rounded-full hover:cursor-pointer text-center  transition-all ease-in-out  bg-primary-900">
																Sending email
																<LoaderCircle />
															</div>
														) : (
															"Verify email"
														)}
													</div>
												)}
											</div>

											<div className="mb-2 sm:mb-6">
												<label
													htmlFor="cgpa"
													className="block mb-2 text-sm font-medium text-inwhite dark:text-white"
												>
													CGPA(out of 100)
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
													className=" bg-transparent text-white border border-indigo-300 text-inwhite text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
													placeholder="cgpa"
													required
												/>
											</div>
											<div className="z-[1002] relative">
												<label
													htmlFor="message"
													className="block mb-2 text-sm font-medium text-inwhite dark:text-white"
												>
													About
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
													className="block p-2.5 w-full text-sm text-inwhite  bg-transparent text-white rounded-lg border border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500 "
													placeholder="Write a few sentences about yourself."
												></textarea>
												<p className="mt-3 text-sm leading-6 text-gray-600"></p>
											</div>
										</div>
										<div className="">
											<div className="relative w-full z-[901] mb-2 text-white ">
												<div>Country</div>
												<div
													onClick={() => {
														console.log(countryDropdown);
														showcountryDropdown(!countryDropdown);
													}}
													className="inline-flex hover:cursor-pointer mt-2 p-1.5 pl-0 justify-between w-full items-center overflow-hidden rounded-md border bg-transparent  border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500 "
												>
													<div className=" px-4 py-2  pl-2 text-sm/none  border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500">
														{formData.country}
													</div>

													<div className="h-full p-2 text-gray-600 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-200">
														<span className="sr-only">Menu</span>
														<svg
															xmlns="http://www.w3.org/2000/svg"
															className="h-4 w-4"
															viewBox="0 0 20 20"
															fill="currentColor"
														>
															<path
																fillRule="evenodd"
																d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
																clipRule="evenodd"
															/>
														</svg>
													</div>
												</div>

												<div
													className={`absolute end-0 z-[900] mt-2 w-full right-0 rounded-md border ring-indigo-500 bg-main-900  border-indigo-300 shadow-lg  ${
														countryDropdown
															? "opacity-1 translate-y-0"
															: "opacity-0 translate-y-[-200%]"
													} transition ease-in-out duration-300 `}
													role="menu"
												>
													<div className="p-2">
														<div
															onClick={() => {
																setFormData((prev) => ({
																	...prev,
																	country: "India",
																}));
																showcountryDropdown(!countryDropdown);
															}}
															className="block rounded-lg px-4 py-2 text-sm text-white hover:bg-gray-50 hover:text-gray-700  dark:hover:bg-gray-800 dark:hover:text-gray-300"
															role="menuitem"
														>
															India
														</div>

														<div
															onClick={() => {
																setFormData((prev) => ({
																	...prev,
																	gender: "USA",
																}));
																showcountryDropdown(!countryDropdown);
															}}
															className="block rounded-lg px-4 py-2 text-sm text-white hover:bg-gray-50 hover:text-gray-700  dark:hover:bg-gray-800 dark:hover:text-gray-300"
															role="menuitem"
														>
															USA
														</div>

														<div
															onClick={() => {
																setFormData((prev) => ({
																	...prev,
																	gender: "Mexico",
																}));
																showcountryDropdown(!countryDropdown);
															}}
															className="block rounded-lg px-4 py-2 text-sm text-white hover:bg-gray-50 hover:text-gray-700  dark:hover:bg-gray-800 dark:hover:text-gray-300"
															role="menuitem"
														>
															Mexico
														</div>
													</div>
												</div>
											</div>
											<div className="">
												<label
													htmlFor="street-address"
													className="block text-sm mt-4 relative z-10 font-medium leading-6 text-white"
												>
													Street address
												</label>
												<div className="mt-2">
													<input
														type="text"
														name="street-address"
														id="street-address"
														autoComplete="street-address"
														placeholder="123 Main St"
														value={formData.address}
														onChange={(e) => {
															setFormData((prev) => {
																return {
																	...prev,
																	address: e.target.value,
																};
															});
														}}
														className=" bg-transparent text-white border border-indigo-300  text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
													/>
												</div>
											</div>
											<div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
												<div className="sm:col-span-2 sm:col-start-1">
													<label
														htmlFor="city"
														className="block text-sm font-medium leading-6 text-white"
													>
														City
													</label>
													<div className="mt-2">
														<input
															type="text"
															name="city"
															id="city"
															value={formData.city}
															onChange={(e) => {
																setFormData((prev) => {
																	return {
																		...prev,
																		city: e.target.value,
																	};
																});
															}}
															autoComplete="address-level2"
															className=" bg-transparent text-white border border-indigo-300 text-inwhite text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
														/>
													</div>
												</div>

												<div className="sm:col-span-2">
													<label
														htmlFor="region"
														className="block text-sm font-medium leading-6 text-white"
													>
														State / Province
													</label>
													<div className="mt-2">
														<input
															type="text"
															name="region"
															id="region"
															value={formData.state}
															onChange={(e) => {
																setFormData((prev) => {
																	return {
																		...prev,
																		state: e.target.value,
																	};
																});
															}}
															autoComplete="address-level1"
															className=" bg-transparent text-white border border-indigo-300 text-inwhite text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
														/>
													</div>
												</div>

												<div className="sm:col-span-2">
													<label
														htmlFor="postal-code"
														className="block text-sm font-medium leading-6 text-white"
													>
														ZIP / Postal code
													</label>
													<div className="mt-2">
														<input
															type="text"
															name="postal-code"
															value={formData.zip_code}
															onChange={(e) => {
																setFormData((prev) => {
																	return {
																		...prev,
																		zip_code: e.target.value,
																	};
																});
															}}
															id="postal-code"
															autoComplete="postal-code"
															className=" bg-transparent text-white border border-indigo-300 text-inwhite text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
														/>
													</div>
												</div>
												{!saving ? (
													// <div className="mt-6 flex items-center justify-start ">
													<button
														type="submit"
														className="bg-primary-600 text-white flex relative justify-center items-center hover:bg-primary-700 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm w-44 px-5 py-2.5"
													>
														Save changes
													</button>
												) : (
													// </div>
													<LoadingButton
														width={null}
														text={"Saving.."}
														className="w-44"
													/>
												)}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</form>
				</main>
			) : (
				<div className="w-full h-screen -mt-16 flex justify-center items-center gap-2">
					<Loading />
				</div>
			)}
		</>
	);
};
export default ProfileComponent;
