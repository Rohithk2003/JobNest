"use client";
import { useEffect, useState } from "react";
import Toast from "../../Toast";
import LoaderCircle from "../../LoaderCircle";
import BackgroundGlow from "../../VisualComponents/BackgroundGlow";
import LoadingButton from "../../LoadingButton";
import AddInterest from "../../AddInterest";
export default function Information() {
	const [startedUpdatingInfo, setStartUpdatingInfo] = useState<boolean>(false);
	const [firstTimeoutDone, setFirstTimeoutDone] = useState<boolean>(false);
	const [savingStarted, setSavingStarted] = useState<boolean>(false);
	const [genderDropDown, showGenderDropDown] = useState<boolean>(false);
	const [countryDropdown, showcountryDropdown] = useState<boolean>(false);
	const [toastInfo, setToastInfo] = useState({
		description: "Saving changes..",
		loader: <LoaderCircle />,
	});
	useEffect(() => {
		if (startedUpdatingInfo && !firstTimeoutDone) {
			let timeout = setTimeout(() => {
				setFirstTimeoutDone(true);
			}, 3000);
			return () => clearTimeout(timeout);
		}
	});
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
		dob: "",
		address: "",
		city: "",
		state: "",
		zip_code: "",
		interests: [],
	});
	return (
		<>
			<Toast
				description={toastInfo.description}
				type="normal"
				controller={startedUpdatingInfo}
				controllerHandlerBoolean={setStartUpdatingInfo}
				loader={<LoaderCircle />}
				time={3000}
			/>
			<section className="max-w-7xl p-6 mx-auto bg-transparent  relative z-[900] rounded-lg dark mt-20">
				<h1 className="text-xl font-bold mb-10 text-white capitalize dark:text-white">
					Account settings
				</h1>
				<form
					onSubmit={(e) => {
						e.preventDefault();
					}}
				>
					<div>
						<div>
							<label className="pt-4 text-white dark:text-gray-200">
								Profile Photo
							</label>
							<div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
								<div className="space-y-1 text-center">
									<svg
										className="mx-auto h-12 w-12 text-white"
										stroke="currentColor"
										fill="none"
										viewBox="0 0 48 48"
										aria-hidden="true"
									>
										<path
											d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
											stroke-width="2"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
									</svg>
									<div className="flex text-sm text-gray-600">
										<label
											htmlFor="file-upload"
											className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
										>
											<span className="">Upload a file</span>
											<input
												id="file-upload"
												name="file-upload"
												type="file"
												className="sr-only"
											/>
										</label>
										<p className="pl-1 text-white">or drag and drop</p>
									</div>
									<p className="text-xs text-white">PNG,JPG up to 10MB</p>
								</div>
							</div>
						</div>
						<div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
							<div>
								<label
									className="text-white dark:text-gray-200"
									htmlFor="firstname"
								>
									First name
								</label>
								<input
									id="firstname"
									placeholder="John"
									type="text"
									className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
								/>
							</div>

							<div>
								<label
									className="text-white dark:text-gray-200"
									htmlFor="lastname"
								>
									Last name
								</label>
								<input
									id="lastname"
									type="text"
									placeholder="Doe"
									className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
								/>
							</div>

							<div>
								<label
									className="text-white dark:text-gray-200"
									htmlFor="passwordConfirmation"
								>
									Country
								</label>
								<select className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
									<option>India</option>
									<option>USA</option>
									<option>Mexico</option>
									<option>Russia</option>
								</select>
							</div>
							<div>
								<label
									className="text-white dark:text-gray-200"
									htmlFor="passwordConfirmation"
								>
									Age
								</label>
								<input
									id="range"
									type="range"
									className="block w-full py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
								/>
								<p>21</p>
							</div>
							<div>
								<label
									className="text-white dark:text-gray-200"
									htmlFor="passwordConfirmation"
								>
									DOB
								</label>
								<input
									id="date"
									type="date"
									className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
								/>
							</div>
							<div>
								<label
									className="text-white dark:text-gray-200"
									htmlFor="text"
								>
									Address
								</label>
								<input
									id="text"
									type="text"
									placeholder="Enter your address..."
									className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
								/>
							</div>
							<div className="relative w-full z-[901]  text-white ">
								<div>Gender</div>

								<div
									onClick={() => {
										showGenderDropDown(!genderDropDown);
									}}
									className="flex flex-row justify-between w-full  py-1 px-2  mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
								>
									<div className="p-2  text-sm/none  border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500">
										{formData.gender}
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
									className={`absolute end-0 z-[900] mt-2 w-full right-0 rounded-md border ring-indigo-500 bg-gray-900  border-indigo-300 shadow-lg  ${
										genderDropDown
											? "opacity-1 translate-y-0"
											: "opacity-0 translate-y-[-150%]"
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
												showGenderDropDown(!genderDropDown);
											}}
											className="block rounded-lg px-4 py-2 text-sm text-white hover:bg-gray-50 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300"
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
												showGenderDropDown(!genderDropDown);
											}}
											className="block rounded-lg px-4 py-2 text-sm text-white hover:bg-gray-50 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300"
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
												showGenderDropDown(!genderDropDown);
											}}
											className="block rounded-lg px-4 py-2 text-sm text-white hover:bg-gray-50 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300"
											role="menuitem"
										>
											Other
										</div>
									</div>
								</div>
							</div>
							<div className="relative w-full z-[901]  text-white ">
								<div>Country</div>
								<div
									onClick={() => {
										showcountryDropdown(!countryDropdown);
									}}
									className="flex flex-row justify-between w-full  py-1 px-2  mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
								>
									<div className="p-2  text-sm/none  border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500">
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
									className={`absolute end-0 z-[900] mt-2 w-full right-0 rounded-md border ring-indigo-500 bg-gray-900  border-indigo-300 shadow-lg  ${
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
											className="block rounded-lg px-4 py-2 text-sm text-white hover:bg-gray-50 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300"
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
											className="block rounded-lg px-4 py-2 text-sm text-white hover:bg-gray-50 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300"
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
											className="block rounded-lg px-4 py-2 text-sm text-white hover:bg-gray-50 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300"
											role="menuitem"
										>
											Mexico
										</div>
									</div>
								</div>
							</div>
							<div>
								<label
									className="text-white dark:text-gray-200"
									htmlFor="text"
								>
									City
								</label>
								<input
									id="text"
									type="text"
									placeholder="Enter your city..."
									className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
								/>
							</div>

							<div>
								<label
									className="text-white dark:text-gray-200"
									htmlFor="text"
								>
									State/Province
								</label>
								<input
									id="text"
									type="text"
									placeholder="Enter your state..."
									className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
								/>
							</div>
							<div>
								<label
									className="text-white dark:text-gray-200"
									htmlFor="text"
								>
									Zip-Code
								</label>
								<input
									id="text"
									type="text"
									placeholder="Enter your zipcode..."
									className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
								/>
							</div>
						</div>
						<div className="w-full mt-10">
							<label
								className="text-white dark:text-gray-200"
								htmlFor="passwordConfirmation"
							>
								About
							</label>
							<textarea
								id="textarea"
								typeof="textarea"
								rows={10}
								placeholder="write something about yourself..."
								className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
							></textarea>
						</div>
						<AddInterest
							userInterest={formData.interests}
							setUserInterest={setFormData}
						/>
					</div>
					<div
						onClick={() => {
							setStartUpdatingInfo(true);
							setTimeout(() => {
								setStartUpdatingInfo(false);
							}, 3000);
						}}
						className="flex justify-end mt-6"
					>
						<button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">
							Save
						</button>
					</div>
				</form>
			</section>
			<BackgroundGlow />
		</>
	);
}
