import Image from "next/image";
import { MdAccountCircle, MdDeleteOutline, MdEdit } from "react-icons/md";
import ProfileImageSkeleton from "../../Loader/ProfileImageSkeleton";
import { ProfileComponentProps, UserProps } from "@/types/custom";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

const ProfileComponent: React.FC<ProfileComponentProps> = ({
	session,
	uploadFile,
	handleChange,
	file,
	handleSubmit,
	formData,
	setFile,
	setFormData,
	showEdtImage,
	setShowEdtImage,
	profileData,
}) => {
	const [dropdown, showDropdown] = useState(false);
	const [country, setCountry] = useState("Country");
	return (
		<main className="w-full min-h-screen py-1 ">
			<form
				onSubmit={handleSubmit}
				name="form"
			>
				<div className="p-2 md:p-4 ">
					<div className="w-full px-6 pb-8 mt-8 sm:rounded-lg">
						<h2 className="text-2xl font-bold sm:text-xl">Profile</h2>

						<div className="grid w-full mx-auto mt-8">
							<div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
								{session?.user ? (
									<div className="relative ">
										{session?.user?.image || session?.user.avatar ? (
											<Image
												className="avatar object-cover z-30 w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
												alt="Bordered avatar"
												src={session?.user?.image || session?.user.avatar || ""}
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
										<div className="w-full h-full z-50 avatar-overlay bg-black opacity-50 hidden absolute top-0 left-0 rounded-full">
											<div className="flex items-center justify-center w-full h-full">
												<MdEdit
													onClick={() => {
														setShowEdtImage(!showEdtImage);
													}}
													className="text-gray-600 hover:cursor-pointer hover:text-white text-2xl"
												/>
												{session?.user.provider != "google" &&
													(session?.user?.image || session?.user.avatar) && (
														<MdDeleteOutline className=" bg-white text-white text-2xl" />
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
													className="py-3.5 px-7 text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-inwhite focus:z-10 focus:ring-4 focus:ring-indigo-200 "
												>
													Upload
												</button>
											)}
										</form>
										{session?.user.provider != "google" && (
											<button
												type="button"
												className="py-3.5 px-7 text-base font-medium text-inwhite focus:outline-none bg-white rounded-lg border border-indigo-200 hover:bg-indigo-100 hover:text-[#202142] focus:z-10 focus:ring-4 focus:ring-indigo-200 "
											>
												Delete picture
											</button>
										)}
									</div>
								)}
							</div>

							<div className="grid lg:grid-rows-1 grid-rows-2 lg:grid-cols-2 grid-cols-1 gap-10">
								<div className="items-center mt-8 sm:mt-14 text-[#202142]">
									<div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
										<div className="w-full">
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
														first_name: e.target.value,
														last_name: formData.last_name,
														username: formData.username,
														email: formData.email,
														cgpa: formData.cgpa,
														bio: formData.bio,
													});
												}}
												className=" bg-transparent text-white border border-indigo-300 text-inwhite text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
												placeholder="First name"
												value={formData.first_name}
												required
											/>
										</div>
										<div className="w-full">
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
									<div className="mb-2 sm:mb-6">
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
											value={`${session?.user?.username}`}
											required
										/>
									</div>
									<div className="mb-2 sm:mb-6">
										<label
											htmlFor="email"
											className="block mb-2 text-sm font-medium text-inwhite dark:text-white"
										>
											email
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
									<div className="mb-6">
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
											placeholder="Write bio here..."
										></textarea>
										<p className="mt-3 text-sm leading-6 text-gray-600">
											Write a few sentences about yourself.
										</p>
									</div>
								</div>
								<div className="mt-12">
									<div className="relative w-full z-[901]">
										<div>Choose country</div>
										<div
											onClick={() => {
												console.log(dropdown);
												showDropdown(!dropdown);
											}}
											className="inline-flex hover:cursor-pointer mt-2 p-1.5 justify-between w-full items-center overflow-hidden rounded-md border bg-white border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-900"
										>
											<div className=" px-4 py-2 text-sm/none  border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500">
												{country}
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
														fill-rule="evenodd"
														d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
														clip-rule="evenodd"
													/>
												</svg>
											</div>
										</div>

										<div
											className={`absolute end-0 z-[900] mt-2 w-full right-0 rounded-md border ring-indigo-500 bg-gray-900  border-indigo-300 shadow-lg  ${
												dropdown
													? "opacity-1 translate-y-0"
													: "opacity-0 translate-y-[-200%]"
											} transition ease-in-out duration-300 delay-150`}
											role="menu"
										>
											<div className="p-2">
												<div
													onClick={() => {
														setCountry("USA");
													}}
													className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300"
													role="menuitem"
												>
													USA
												</div>

												<div
													onClick={() => {
														setCountry("Mexico");
													}}
													className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300"
													role="menuitem"
												>
													Mexico
												</div>

												<div
													onClick={() => {
														setCountry("India");
													}}
													className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300"
													role="menuitem"
												>
													India
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
													id="postal-code"
													autoComplete="postal-code"
													className=" bg-transparent text-white border border-indigo-300 text-inwhite text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
												/>
											</div>
										</div>

										<div className="mt-6 flex items-center justify-start ">
											<button
												type="submit"
												className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
											>
												Save
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</form>
		</main>
	);
};
export default ProfileComponent;
