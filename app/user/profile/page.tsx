"use client";
import { createClient } from "@/utils/supabase/client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import DashboardNavigation from "@/app/components/DashboardNavigation/layout";
import { BiErrorCircle } from "react-icons/bi";
import { UserProps } from "@/types/custom";
import ProfileComponent from "@/app/components/ProfilePage/ProfileComponent";
import AccountSettings from "@/app/components/ProfilePage/AccountSettings";
import {
	accountSettingsTab,
	premiumTab,
	profileTab,
	savedTab,
	tables,
} from "@/configs/constants";
import { PostgrestError } from "@supabase/supabase-js";
import Loading from "@/app/loading";
import Toast from "@/app/components/Toast";

export default function Profile() {
	const { data: session } = useSession();
	const supabase = createClient();
	const [sessionLoaded, setSessionLoaded] = useState(false);
	const [showProfileData, setShowProfileData] = useState(true);
	const [showAccountSettings, setShowAccountSettings] = useState(false);
	const [showPremium, setShowPremium] = useState(false);
	const [showSaved, setShowSaved] = useState(false);

	const [activeTab, setActiveTab] = useState(profileTab);
	const [indicatorPosition, setIndicatorPosition] = useState({
		top: 18,
		left: 10,
	});
	const [error, seterror] = useState<PostgrestError | null>();
	const [description, setDescription] = useState("");
	const [title, setTitle] = useState("");
	const [toastHandle, setToastHandler] = useState(false);

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
						description={description}
						type={"success"}
						controller={toastHandle}
						controllerHandlerBoolean={setToastHandler}
						loader={null}
						time={3000}
					/>
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
							{showProfileData && <ProfileComponent />}
							{showAccountSettings && <AccountSettings />}
						</div>
					</>
				</>
			)}
		</div>
	);
}
