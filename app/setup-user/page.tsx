"use client";
import { ReactNode, useState } from "react";
import Information from "../components/Setup-User/Information";
import Header from "../components/MainPage/Navigation/Header";
import { useSession } from "next-auth/react";
import ResumeUpload from "../components/Setup-User/ResumeUpload";
import SendVerificationEmailComponent from "../components/SendVerificationEmailComponent";
import { getDashboardRoute } from "@/configs/constants";
import { useRouter } from "next/navigation";
export default function SetupUser() {
	const router = useRouter();

	const { data: session } = useSession();
	const [steps, setStep] = useState({
		stepsItems: ["Resume", "Profile", "Email verification"],
		currentStep: 1,
	});
	const components: Record<number, ReactNode> = {
		1: <ResumeUpload />,
		2: <Information />,
		3: <SendVerificationEmailComponent />,
	};
	return (
		<>
			<Header session={session} />
			<div className="flex justify-center  flex-col pt-40 items-center h-max pb-40 relative">
				<div className="w-[42rem] mx-auto px-4 md:px-8 ">
					<ul
						aria-label="Steps"
						className="items-center text-gray-600 md:flex"
					>
						{steps.stepsItems.map((item: string, idx: number) => (
							<li
								key={idx}
								aria-current={steps.currentStep == idx + 1 ? "step" : false}
								className="flex-auto flex md:items-center"
							>
								<div
									className={`flex-auto flex items-center gap-x-3 md:block ${
										idx != 0 ? "md:space-x-10" : ""
									}`}
								>
									<span
										className={`block h-24 w-1 md:w-full md:h-1 ${
											steps.currentStep > idx ? "bg-indigo-600" : "bg-gray-200"
										}`}
									></span>
									<div className="md:mt-2">
										<p
											className={`text-sm ${
												steps.currentStep > idx ? "text-indigo-600" : ""
											}`}
										>
											Step {idx + 1}
										</p>
										<h3 className="mt-1  text-white">{item}</h3>
									</div>
								</div>
							</li>
						))}
					</ul>
					<div className="min-h-[60vh] flex justify-center items-center">
						{components[steps.currentStep]}
					</div>
					<div className="flex justify-between mt-4 items-center">
						<button
							onClick={() => {
								if (steps.currentStep > 1) {
									setStep((prev) => ({
										...prev,
										currentStep: prev.currentStep - 1,
									}));
								}
							}}
							className={`px-6 ${
								steps.currentStep > 1 ? "block" : "hidden"
							} py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600`}
						>
							Prev
						</button>
						<button
							onClick={() => {
								if (steps.currentStep < steps.stepsItems.length) {
									setStep((prev) => ({
										...prev,
										currentStep: prev.currentStep + 1,
									}));
								}
							}}
							className={`px-6 py-2 leading-5 ${
								steps.currentStep < steps.stepsItems.length ? "block" : "hidden"
							} text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-pink-700 focus:outline-none `}
						>
							Next
						</button>
						<button
							onClick={() => {
								router.push(getDashboardRoute());
							}}
							className={`px-6 py-2 leading-5 ${
								steps.currentStep === steps.stepsItems.length
									? "block"
									: "hidden"
							} text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-pink-700 focus:outline-none `}
						>
							Finish
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
