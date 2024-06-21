"use client";
import { profileTab } from "@/configs/constants";
import { createClient } from "@/utils/supabase/client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { PostgrestError } from "@supabase/supabase-js";
import { BiErrorCircle } from "react-icons/bi";
import Toast from "@/components/Toast";
import ProfileComponent from "@/components/ProfilePage/ProfileComponent";
import DashboardNavigation from "@/components/DashboardNavigation/layout";
import AccountSettings from "@/components/ProfilePage/AccountSettings";
import FooterSection from "@/components/MainPage/Footer";

export default function Settings() {
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
		<>
			<div className=" relative mb-20">
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
						<div className="relative z-[1000] flex justify-center items-center">
							<div className="w-2/3 flex justify-center items-center flex-col">
								<ProfileComponent />
								<AccountSettings />
							</div>
						</div>
					</>
				)}
			</div>
			<FooterSection />
		</>
	);
}
