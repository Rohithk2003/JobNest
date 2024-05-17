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
import ProfileComponent from "@/app/components/ProfilePage/ProfileComponent";
import AccountSettings from "@/app/components/ProfilePage/AccountSettings";

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
								<div
									onClick={() => {
										setShowProfileData(true);
										setShowAccountSettings(false);
									}}
									className="flex items-center px-3 py-2.5 font-bold bg-white  text-indigo-900 border rounded-full"
								>
									Pubic Profile
								</div>
								<div
									onClick={() => {
										setShowProfileData(false);
										setShowAccountSettings(true);
									}}
									className="flex items-center px-3 py-2.5 font-semibold  hover:text-white hover:border hover:rounded-full"
								>
									Account Settings
								</div>
								<div className="flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full  ">
									Notifications
								</div>
								<div className="flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full  ">
									Pro Account
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
