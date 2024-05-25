import { PlusCircleIcon } from "@heroicons/react/16/solid";
import * as React from "react";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { FaPlus } from "react-icons/fa";
const search = (input: string[], query: string) => {
	return input.filter((item) =>
		item.toLowerCase().includes(query.toLowerCase())
	);
};
export default function AddInterest({
	userInterest,
	setUserInterest,
}: {
	userInterest: string[];
	setUserInterest: React.Dispatch<
		React.SetStateAction<{
			first_name: string;
			last_name: string;
			username: string;
			email: string;
			cgpa: number;
			bio: string;
			country: string;
			gender: string;
			age: number;
			dob: string;
			address: string;
			city: string;
			state: string;
			zip_code: string;
			interests: never[];
		}>
	>;
}) {
	const [searchResults, setSearchResults] = useState<string[]>([]);
	const [defaultJobs, setDefaultJobs] = useState<string[]>([
		"Python",
		"Django",
		"Backend Developer",
		"Frontend Developer",
		"Full Stack Developer",
		"React",
	]);
	const defaultjobsavailable = [
		"Python",
		"Django",
		"Backend Developer",
		"Frontend Developer",
		"Full Stack Developer",
		"React",
	];
	const defaultNumberOfInterests = 5;
	const jobtypes = [
		"Python",
		"Django",
		"Backend Developer",
		"Frontend Developer",
		"Full Stack Developer",
		"React",
		"Node.js",
		"Angular",
		"Vue.js",
		"Web Developer",
		"Mobile Developer",
		"Android Developer",
		"iOS Developer",
		"Flutter",
		"React Native",
		"Swift",
		"Kotlin",
		"Java",
		"JavaScript",
		"TypeScript",
		"PHP",
		"Laravel",
		"Symfony",
		"CodeIgniter",
		"WordPress",
		"Shopify",
		"Magento",
		"Drupal",
		"Ruby",
		"Ruby on Rails",
		"Go",
		"Rust",
		"Scala",
		"Kotlin",
		"Java",
	];
	return (
		<div>
			<h1 className="text-md mt-10 T">Add Interest</h1>
			<div className="flex justify-center items-center mt-4 w-full  flex-col gap-10">
				<div className="relative">
					<input
						type="text"
						onChange={(e) =>
							setDefaultJobs((prev) => {
								return (prev =
									e.target.value === ""
										? defaultjobsavailable
										: search(jobtypes, e.target.value));
							})
						}
						placeholder="Type here"
						className="input input-bordered input-info w-full"
					/>
					<BiSearch
						className="absolute right-4 top-4"
						size={20}
					/>
				</div>
				<div className="flex flex-row flex-wrap gap-4 p-5">
					{defaultJobs.map(
						(input, index) =>
							defaultNumberOfInterests > index && (
								<Interest
									title={input}
									key={index}
									handler={() =>
										setUserInterest((prev) => {
											return {
												...prev,
												interests: [...prev.interests, input],
											};
										})
									}
								/>
							)
					)}
				</div>
			</div>
		</div>
	);
}
export function Interest({
	title,
	handler,
}: {
	title: string;
	handler: () => void;
}) {
	return (
		<div
			onClick={handler}
			className="flex flex-row gap-2 hover:bg-neutral-700 p-5 w-max h-10 border border-white rounded-full justify-center items-center"
		>
			<div>{title}</div>
			<div>
				<FaPlus className="w-2 h-2" />
			</div>
		</div>
	);
}
