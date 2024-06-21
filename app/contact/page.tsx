"use client";
import {  useState } from "react";
import { useInView } from "react-intersection-observer";
import { useSession } from "next-auth/react";
import GridLines from "@/components/VisualComponents/GridLines";
import Navigation from "@/components/MainPage/Navigation";

export default function Contact() {
	const [emailid, setemailid] = useState("");
	const [firstname, setfirstname] = useState("");
	const [lastname, setlastname] = useState("");
	const [subject, setSubject] = useState("");
	const [message, setMessage] = useState("");
	const { data: session } = useSession();
	const names = [
		{
			name: "First Name",
			state_var: firstname,
			state_change_function: setfirstname,
		},
		{
			name: "Second Name",
			state_var: lastname,
			state_change_function: setlastname,
		},
	];
	const [modelOpen, setModelOpen] = useState(false);
	const [modelMessage, setModelMessage] = useState("");
	const [modelHeading, setModelHeading] = useState("");
	const [loading, setLoading] = useState(false);
	const handleSubmit = () => {
		const formData = new FormData();
		formData.append("name", firstname + " " + lastname);
		formData.append("email", emailid);
		formData.append("subject", subject);
		formData.append("message", message);
		setLoading(true);
		fetch("https://formspree.io/f/mkndqkjp", {
			method: "POST",
			body: formData,
			headers: {
				Accept: "application/json",
			},
		}).then((response) => {
			if (response.ok) {
				setModelOpen(true);
				setModelMessage("Your Message was successfully sent!");
				setModelHeading("Success");
			} else {
				setModelOpen(true);
				setModelMessage("Message not sent");
				setModelHeading("Success");
			}
		});
	};
	const [ref, inView, entry] = useInView({
		threshold: 0.15,
	});
	return (
		<>
			<Navigation />{" "}
			<div
				ref={ref}
				className="relative z-[400] bg-transparent flex justify-center items-center w"
			>
				<div
					id="model"
					className={`transition ease-out duration-500 ${
						modelOpen ? "opacity-1 fixed z-[900] " : "opacity-0 "
					}`}
				>
					<div className="overlay flex flex-col justify-center items-center w-[100%] h-[100%]">
						<div className="  absolute  h-96 w-96 z-[1000] ">
							<div className="relative p-4 w-full max-w-lg h-full md:h-auto">
								<div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 md:p-8">
									<div className="mb-4 text-sm font-light text-gray-500 dark:text-gray-400">
										<h3 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
											{modelHeading}
										</h3>
										<p>{modelMessage}</p>
									</div>
									<div className="justify-between items-center pt-0 space-y-4 sm:flex sm:space-y-0">
										<div className="items-center space-y-4 sm:space-x-4 sm:flex sm:space-y-0">
											<button
												onClick={() => {
													setModelOpen(false);
													setLoading(false);
												}}
												type="button"
												className="py-2 px-4 w-full text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 sm:w-auto hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
											>
												Okay
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<section
					className={
						"about-section text-white! py-20  bg-transparent  w-1/2 justify-between h-max flex flex-wrap flex-row"
					}
					id={"contact"}
				>
					<div
						className={
							"py-8 lg:py-16  px-8 md:pl-28 md:pt-24 w-full flex flex-col justify-center"
						}
					>
						<h2
							className={
								"mb-4 text-4xl main-one animate-1 tracking-tight font-extrabold  text-white dark:text-white"
							}
						>
							Let&apos;s Make Your Dream Space a Reality
						</h2>

						<p
							className={
								"mb-8 lg:mb-16 font-light main-one animate-2 text-white sm:text-xl"
							}
						>
							If you&apos;ve made it this far and are interesting in simply
							saying hello or finding out more, please email me directly, or
							fill in this form and I will get back to you.
						</p>
						<form
							onSubmit={(e) => {
								e.preventDefault();
								handleSubmit();
							}}
							className={"space-y-8"}
							encType="multipart/form-data"
						>
							<div
								className={
									"md:flex grid animate-3 grid-rows-2 gap-2 w-full flex-row justify-normal md:justify-between"
								}
							>
								{names.map((name, index) => {
									return (
										<div
											key={index}
											className={"w-full main-one animate-3 md:w-1/2"}
										>
											<label
												htmlFor="firstname"
												className={
													"block mb-2 pl-1.5 text-md w-full font-medium text-gray-900 dark:text-gray-300"
												}
											>{`${name.name} (required)`}</label>
											<input
												type="name"
												id="name"
												value={name.state_var}
												onChange={(event) => {
													name.state_change_function(event.target.value);
												}}
												className={
													"shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
												}
												placeholder={`${name.name}`}
												required
											/>
										</div>
									);
								})}
							</div>
							<div
								className={
									"md:flex grid animate-3 grid-rows-2 gap-2 h-20 mb-[10px]  w-full flex-row justify-normal md:justify-between"
								}
							>
								<div className={"w-full main-one animate-3 "}>
									<label
										htmlFor="email"
										className={
											"block mb-2 pl-1.5 text-md font-medium text-gray-900 dark:text-gray-300"
										}
									>
										Email (required)
									</label>
									<input
										type="email"
										id="email"
										value={emailid}
										onChange={(event) => {
											setemailid(event.target.value);
										}}
										className={
											"shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
										}
										placeholder={`Email..`}
										required
									/>
								</div>
							</div>
							<div className="main-one animate-4">
								<label
									htmlFor="subject"
									className={
										"block mb-2 text-md font-medium text-gray-900 dark:text-gray-300"
									}
								>
									Subject (required)
								</label>
								<input
									type="text"
									id="subject"
									value={subject}
									onChange={(event) => {
										setSubject(event.target.value);
									}}
									className={
										"block p-3 w-full text-md text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
									}
									placeholder="Let us know how we can help you"
									required
								/>
							</div>
							<div className={"sm:col-span-2 pb-4 main-one animate-5"}>
								<label
									htmlFor="message"
									className={
										"flex flex-col gap-3 mb-[-100px]  text-md font-medium text-gray-900 dark:text-gray-400"
									}
								>
									<span>Message (required)</span>
									<span className="mb-20 text-white">
										Tell me more about commission idea or project...
									</span>
								</label>
							</div>
							<textarea
								id="message"
								rows={6}
								value={message}
								onChange={(event) => {
									setMessage(event.target.value);
								}}
								className={
									"block main-one animate-4 mb-20 p-2.5  w-full text-md text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
								}
								placeholder="Leave a comment..."
								required
							></textarea>

							<button
								className={
									"py-3 px-5 main-one flex justify-center items-center animate-5 text-md font-medium text-center text-white rounded-lg h-14 bg-gray-800 sm:w-44 hover:bg-gray-600 transition duration-300 ease-in-out focus:ring-4 focus:outline-none focus:ring-primary-300"
								}
							>
								{loading ? (
									<div role="status">
										<svg
											aria-hidden="true"
											className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
											viewBox="0 0 100 101"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
												fill="currentColor"
											/>
											<path
												d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
												fill="currentFill"
											/>
										</svg>
										<span className="sr-only">Loading...</span>
									</div>
								) : (
									"Send Message"
								)}
							</button>
						</form>
					</div>
				</section>
			</div>
			<GridLines />
		</>
	);
}
