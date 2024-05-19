"use client";

import { createClient } from "@/utils/supabase/client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import DashboardNavigation from "../../components/DashboardNavigation/layout";
import { BiErrorCircle } from "react-icons/bi";
import { RevolvingDot } from "react-loader-spinner";
import { UserProps } from "@/types/custom";
import Popup from "@/app/components/Popup";
import ProfileComponent from "@/app/components/ProfilePage/ProfileComponent";
import AccountSettings from "@/app/components/ProfilePage/AccountSettings";
import {
	accountSettingsTab,
	getLoginRoute,
	premiumTab,
	profileTab,
	savedTab,
} from "@/configs/constants";
import { PostgrestError } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import Loading from "@/app/loading";
import Toast from "@/app/components/Toast";

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
	const [showProfileData, setShowProfileData] = useState(true);
	const [showAccountSettings, setShowAccountSettings] = useState(false);
	const [showPremium, setShowPremium] = useState(false);
	const [showSaved, setShowSaved] = useState(false);

	const [profileData, setProfileData] = useState<UserProps | null>();
	const [activeTab, setActiveTab] = useState(profileTab);
	const [indicatorPosition, setIndicatorPosition] = useState({
		top: 18,
		left: 10,
	});
	const [error, seterror] = useState<PostgrestError | null>();
	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const { first_name, last_name, email, username, cgpa, bio } = formData;
		const name = `${first_name} ${last_name}`;
		let table = "users";
		if (session?.user?.provider !== "google") {
			table = "credentials";
		}
		const response = await supabase
			.schema("next_auth")
			.from(table)
			.update({ name, username, cgpa, bio })
			.eq("email", email);
		if (response.error) {
			setShowPopup({
				show: true,
				title: "Error",
				description:
					response.error.message ||
					"An error occured while updating your profile.",
			});
		} else {
			setShowPopup({
				show: true,
				title: table,
				description:
					"Your profile has been updated successfully. Please refresh the page to see the changes.",
			});
		}
	}

	useEffect(() => {
		if (!sessionLoaded && session) {
			const fetchData = async () => {
				let table = "users";
				if (session?.user?.provider !== "google") {
					table = "credentials";
				}
				const { data, error } = await supabase
					.schema("next_auth")
					.from(table)
					.select("*")
					.eq("email", session?.user?.email);
				console.log(data);
				setProfileData(data && data[0]);
				seterror(error);
			};
			fetchData();
			if (profileData) {
				setSessionLoaded(true);
				console.log(profileData.name);
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
		<div className="relative overflow-x-hidden">
			<DashboardNavigation
				fromMainPage={undefined}
				session={session}
			/>
			{error ? (
				<div className="w-screen h-dvh flex justify-center items-center text-3xl text-red-600">
					Could not load data
					<BiErrorCircle />
				</div>
			) : (
				<>
					<Toast
						description={showPopup.description}
						type={"success"}
						controller={showPopup.show}
						controllerHandler={setShowPopup}
					/>

					{sessionLoaded ? (
						<>
							<div className="bg-transparent w-full relative z-[400] flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-white">
								<aside className="hidden py-4 md:w-1/3 lg:w-1/4 md:block">
									<h2 className="pl-5 mb-4 text-2xl font-semibold mt-10">
										Settings
									</h2>
									<div className="sticky flex flex-col gap-4 p-4 text-sm border-r  border-indigo-100 top-12">
										<div
											style={{
												top: `${indicatorPosition.top}px`,
												left: `${indicatorPosition.left}px`,
											}}
											className={`bg-white transition-top duration-300  px-[14px] py-[20px] z-[10] absolute rounded-full w-[92%]`}
										></div>
										<div
											onClick={() => {
												setShowProfileData(true);
												setShowAccountSettings(false);
												setActiveTab(profileTab);
												setShowPremium(false);
												setShowSaved(false);
												setIndicatorPosition({
													top: 18,
													left: 10,
												});
											}}
											className={`flex items-center ${
												activeTab === profileTab ? "text-black" : "text-white"
											}   bg-transparent  px-3 py-3 rounded-full z-[100] font-bold`}
										>
											View profile
										</div>
										<div
											onClick={() => {
												setShowProfileData(false);
												setShowAccountSettings(true);
												setShowPremium(false);
												setShowSaved(false);
												setActiveTab(accountSettingsTab);
												setIndicatorPosition({
													top: 80,
													left: 10,
												});
											}}
											className={`flex items-center ${
												activeTab === accountSettingsTab
													? "text-black"
													: "text-white"
											} bg-transparent  px-3 py-3 rounded-full z-[100] font-bold`}
										>
											Account Settings
										</div>
										<div
											onClick={() => {
												setShowProfileData(false);
												setShowAccountSettings(false);
												setActiveTab(premiumTab);
												setShowPremium(true);
												setShowSaved(false);
												setIndicatorPosition({
													top: 140,
													left: 10,
												});
											}}
											className={`flex items-center ${
												activeTab === premiumTab ? "text-black" : "text-white"
											}   bg-transparent  px-3 py-3 rounded-full z-[100] font-bold`}
										>
											Premium
										</div>
										<div
											onClick={() => {
												setShowProfileData(false);
												setShowAccountSettings(false);
												setActiveTab(savedTab);
												setShowPremium(false);
												setShowSaved(true);
												setIndicatorPosition({
													top: 200,
													left: 10,
												});
											}}
											className={`flex items-center ${
												activeTab === savedTab ? "text-black" : "text-white"
											}   bg-transparent  px-3 py-3 rounded-full z-[100] font-bold`}
										>
											Saved jobs
										</div>
									</div>
								</aside>
								{showProfileData && (
									<ProfileComponent
										session={session}
										formData={formData}
										setFormData={setFormData}
										handleSubmit={handleSubmit}
										showEdtImage={showEdtImage}
										setShowEdtImage={setShowEdtImage}
										file={file}
										setFile={setFile}
										uploadFile={uploadFile}
										handleChange={handleChange}
										profileData={profileData}
									/>
								)}
								{showAccountSettings && <AccountSettings />}
							</div>
						</>
					) : (
						<div className="w-screen h-screen -mt-16 flex justify-center items-center gap-2">
							<Loading />
						</div>
					)}
				</>
			)}
		</div>
	);
}
