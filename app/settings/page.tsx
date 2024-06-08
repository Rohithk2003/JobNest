"use client";
import { profileTab } from "@/configs/constants";
import { createClient } from "@/utils/supabase/client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { PostgrestError } from "@supabase/supabase-js";
import { BiErrorCircle } from "react-icons/bi";
import Toast from "../components/Toast";
import ProfileComponent from "../components/ProfilePage/ProfileComponent";
import DashboardNavigation from "../components/DashboardNavigation/layout";
import AccountSettings from "../components/ProfilePage/AccountSettings";
import FooterSection from "../components/MainPage/Footer";

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
						{/* <div className="flex flex-col w-full min-h-screen">
							<header className="bg-gray-100 dark:bg-gray-800 px-4 md:px-6 py-6 border-b">
								<div className="max-w-6xl mx-auto">
									<h1 className="text-2xl font-bold">Settings</h1>
									<p className="text-gray-500 dark:text-gray-400">
										Manage your profile, account settings, and saved jobs.
									</p>
								</div>
							</header>
							<main className="flex-1 bg-gray-100/40 dark:bg-gray-800/40 p-4 md:p-10">
								<div className="max-w-6xl mx-auto grid gap-8">
									<section>
										<h2 className="text-xl font-bold">Profile</h2>
										<div className="grid md:grid-cols-[180px_1fr] gap-6">
											<div className="flex flex-col items-center gap-4">
												<span className="relative flex shrink-0 overflow-hidden rounded-full h-20 w-20">
													<span className="flex h-full w-full items-center justify-center rounded-full bg-muted">
														JP
													</span>
												</span>
												<button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
													Change Photo
												</button>
											</div>
											<div className="grid gap-4">
												<div className="grid gap-2">
													<label
														className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
														htmlFor="name"
													>
														Name
													</label>
													<input
														className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
														id="name"
														value="Jared Palmer"
													/>
												</div>
												<div className="grid gap-2">
													<label
														className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
														htmlFor="email"
													>
														Email
													</label>
													<input
														className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
														id="email"
														type="email"
														value="jared@example.com"
													/>
												</div>
												<div className="grid gap-2">
													<label
														className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
														htmlFor="phone"
													>
														Phone
													</label>
													<input
														className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
														id="phone"
														type="tel"
														value="+1 (555) 555-5555"
													/>
												</div>
												<div className="grid gap-2">
													<label
														className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
														htmlFor="bio"
													>
														Bio
													</label>
													<textarea
														className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
														id="bio"
														rows={3}
													>
														I&apos;m a software engineer and designer.
													</textarea>
												</div>
											</div>
										</div>
									</section>
									<section>
										<h2 className="text-xl font-bold">Account Settings</h2>
										<div className="grid gap-6">
											<div className="grid gap-2">
												<label
													className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
													htmlFor="username"
												>
													Username
												</label>
												<input
													className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
													id="username"
													value="jaredpalmer"
												/>
											</div>
											<div className="grid gap-2">
												<label
													className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
													htmlFor="password"
												>
													Password
												</label>
												<input
													className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
													id="password"
													type="password"
												/>
											</div>
											<div className="grid gap-2">
												<label
													className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
													htmlFor="privacy"
												>
													Privacy
												</label>
												<button
													type="button"
													role="combobox"
													aria-controls="radix-:r2:"
													aria-expanded="false"
													aria-autocomplete="none"
													dir="ltr"
													data-state="closed"
													data-placeholder=""
													className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
												>
													<span style={{ pointerEvents: "none" }}>
														Select privacy setting
													</span>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width="24"
														height="24"
														viewBox="0 0 24 24"
														fill="none"
														stroke="currentColor"
														stroke-width="2"
														stroke-linecap="round"
														stroke-linejoin="round"
														className="lucide lucide-chevron-down h-4 w-4 opacity-50"
														aria-hidden="true"
													>
														<path d="m6 9 6 6 6-6"></path>
													</svg>
												</button>
											</div>
											<div className="grid gap-2">
												<label
													className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
													htmlFor="notifications"
												>
													Notifications
												</label>
												<button
													type="button"
													role="combobox"
													aria-controls="radix-:r6:"
													aria-expanded="false"
													aria-autocomplete="none"
													dir="ltr"
													data-state="closed"
													data-placeholder=""
													className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
												>
													<span style={{ pointerEvents: "none" }}>
														Select notification setting
													</span>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width="24"
														height="24"
														viewBox="0 0 24 24"
														fill="none"
														stroke="currentColor"
														stroke-width="2"
														stroke-linecap="round"
														stroke-linejoin="round"
														className="lucide lucide-chevron-down h-4 w-4 opacity-50"
														aria-hidden="true"
													>
														<path d="m6 9 6 6 6-6"></path>
													</svg>
												</button>
											</div>
											<div className="grid gap-2">
												<label
													className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
													htmlFor="linked-accounts"
												>
													Linked Accounts
												</label>
												<div className="flex items-center gap-4">
													<div className="flex items-center gap-2">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="24"
															height="24"
															viewBox="0 0 24 24"
															fill="none"
															stroke="currentColor"
															stroke-width="2"
															stroke-linecap="round"
															stroke-linejoin="round"
															className="h-6 w-6"
														>
															<circle
																cx="12"
																cy="12"
																r="10"
															></circle>
															<circle
																cx="12"
																cy="12"
																r="4"
															></circle>
															<line
																x1="21.17"
																x2="12"
																y1="8"
																y2="8"
															></line>
															<line
																x1="3.95"
																x2="8.54"
																y1="6.06"
																y2="14"
															></line>
															<line
																x1="10.88"
																x2="15.46"
																y1="21.94"
																y2="14"
															></line>
														</svg>
														<span>Google</span>
													</div>
													<div className="flex items-center gap-2">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="24"
															height="24"
															viewBox="0 0 24 24"
															fill="none"
															stroke="currentColor"
															stroke-width="2"
															stroke-linecap="round"
															stroke-linejoin="round"
															className="h-6 w-6"
														>
															<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
															<path d="M9 18c-4.51 2-5-2-7-2"></path>
														</svg>
														<span>GitHub</span>
													</div>
													<button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="24"
															height="24"
															viewBox="0 0 24 24"
															fill="none"
															stroke="currentColor"
															stroke-width="2"
															stroke-linecap="round"
															stroke-linejoin="round"
															className="h-5 w-5"
														>
															<path d="M5 12h14"></path>
															<path d="M12 5v14"></path>
														</svg>
														<span className="sr-only">Add Linked Account</span>
													</button>
												</div>
											</div>
											<div className="grid gap-2">
												<label
													className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
													htmlFor="deactivate"
												>
													Deactivate Account
												</label>
												<button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 h-10 px-4 py-2">
													Deactivate Account
												</button>
											</div>
										</div>
									</section>
									<section>
										<h2 className="text-xl font-bold">Saved Jobs</h2>
										<div className="grid gap-4">
											<div className="grid gap-2 bg-white dark:bg-gray-950 p-4 rounded-md shadow">
												<div className="flex items-center justify-between">
													<div className="text-lg font-medium">
														Senior Software Engineer
													</div>
													<div className="text-sm text-gray-500 dark:text-gray-400">
														2 days ago
													</div>
												</div>
												<div className="text-gray-500 dark:text-gray-400">
													Acme Inc. - San Francisco, CA
												</div>
												<div className="flex items-center gap-4">
													<button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
														Apply
													</button>
													<button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="24"
															height="24"
															viewBox="0 0 24 24"
															fill="none"
															stroke="currentColor"
															stroke-width="2"
															stroke-linecap="round"
															stroke-linejoin="round"
															className="h-5 w-5"
														>
															<path d="M3 6h18"></path>
															<path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
															<path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
														</svg>
														<span className="sr-only">Delete</span>
													</button>
												</div>
											</div>
											<div className="grid gap-2 bg-white dark:bg-gray-950 p-4 rounded-md shadow">
												<div className="flex items-center justify-between">
													<div className="text-lg font-medium">
														UI/UX Designer
													</div>
													<div className="text-sm text-gray-500 dark:text-gray-400">
														1 week ago
													</div>
												</div>
											</div>
										</div>
									</section>
								</div>
							</main>
						</div> */}
					</>
				)}
			</div>
			<FooterSection />
		</>
	);
}
