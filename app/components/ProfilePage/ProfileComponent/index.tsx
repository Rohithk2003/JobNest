import { Session } from "next-auth";
import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";
import Image from "next/image";
import { MdAccountCircle, MdDeleteOutline, MdEdit } from "react-icons/md";
import ProfileImageSkeleton from "../../Loader/ProfileImageSkeleton";
import { ProfileComponentProps, UserProps } from "@/types/custom";

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
	return (
		<main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
			<div className="p-2 md:p-4">
				<div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
					<h2 className="text-2xl font-bold sm:text-xl">Profile</h2>

					<div className="grid max-w-2xl mx-auto mt-8">
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
											className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
											placeholder="First name"
											value={formData.first_name}
											required
										/>
									</div>
									<div className="w-full">
										<label
											htmlFor="last_name"
											className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
										>
											Last name
										</label>
										<input
											type="text"
											id="last_name"
											name="last_name"
											className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
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
										className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
									>
										Username
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
										email
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
										className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
										placeholder="cgpa"
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
										placeholder="Write bio here..."
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
	);
};
export default ProfileComponent;
