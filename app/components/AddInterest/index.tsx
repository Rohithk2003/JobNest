import { PlusCircleIcon } from "@heroicons/react/16/solid";
import * as React from "react";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { FaPlus } from "react-icons/fa";
import { inputType, useInput } from "../Setup-User/SharedInputContextState";
import { InputType } from "zlib";
const search = (
	input: {
		name: string;
		selected: boolean;
	}[],
	query: string
) => {
	return input.filter((item) =>
		item.name.toLowerCase().includes(query.toLowerCase())
	);
};
export default function AddInterest() {
	const { input, setInput } = useInput();
	const [searchResults, setSearchResults] = useState<
		{
			name: string;
			selected: boolean;
		}[]
	>([]);
	const [defaultJobs, setDefaultJobs] = useState<
		{ name: string; selected: boolean }[]
	>([
		{
			name: "Python",
			selected: false,
		},
		{
			name: "Django",
			selected: false,
		},
		{
			name: "Frontend Developer",
			selected: false,
		},
		{
			name: "Backend Developer",
			selected: false,
		},
		{
			name: "React JS",
			selected: false,
		},
	]);
	const defaultjobsavailable = [
		{
			name: "Python",
			selected: false,
		},
		{
			name: "Django",
			selected: false,
		},
		{
			name: "Frontend Developer",
			selected: false,
		},
		{
			name: "Backend Developer",
			selected: false,
		},
		{
			name: "React JS",
			selected: false,
		},
	];
	const defaultNumberOfInterests = 5;
	const jobtypes = [
		{ name: "Python", selected: false },
		{ name: "Django", selected: false },
		{ name: "Backend Developer", selected: false },
		{ name: "Frontend Developer", selected: false },
		{ name: "Full Stack Developer", selected: false },
		{ name: "React", selected: false },
		{ name: "Node.js", selected: false },
		{ name: "Angular", selected: false },
		{ name: "Vue.js", selected: false },
		{ name: "Web Developer", selected: false },
		{ name: "Mobile Developer", selected: false },
		{ name: "Android Developer", selected: false },
		{ name: "iOS Developer", selected: false },
		{ name: "Flutter", selected: false },
		{ name: "React Native", selected: false },
		{ name: "Swift", selected: false },
		{ name: "Kotlin", selected: false },
		{ name: "Java", selected: false },
		{ name: "JavaScript", selected: false },
		{ name: "TypeScript", selected: false },
		{ name: "PHP", selected: false },
		{ name: "Laravel", selected: false },
		{ name: "Symfony", selected: false },
		{ name: "CodeIgniter", selected: false },
		{ name: "WordPress", selected: false },
		{ name: "Shopify", selected: false },
		{ name: "Magento", selected: false },
		{ name: "Drupal", selected: false },
		{ name: "Ruby", selected: false },
		{ name: "Ruby on Rails", selected: false },
		{ name: "Go", selected: false },
		{ name: "Rust", selected: false },
		{ name: "Scala", selected: false },
		{ name: "Kotlin", selected: false },
		{ name: "Java", selected: false },
	];

	React.useEffect(() => {
		console.log(input);
	}, [input]);
	return (
		<div>
			<h1 className="text-md mt-10 T">Add Interest</h1>
			<div className="flex justify-center items-center mt-4 w-full  flex-col gap-10">
				<div className="relative w-full">
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
						placeholder="Search for interests.."
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
									interest={input}
									key={index}
									handler={setInput}
									defaultJobsAvailable={defaultjobsavailable}
								/>
							)
					)}
				</div>
			</div>
		</div>
	);
}
export function Interest({
	interest,
	handler,
	defaultJobsAvailable,
}: {
	interest: { name: string; selected: boolean };
	handler: React.Dispatch<React.SetStateAction<inputType>>;

	defaultJobsAvailable: {
		name: string;
		selected: boolean;
	}[];
}) {
	return (
		<div
			onClick={() => {
				interest.selected = !interest.selected;
				defaultJobsAvailable.map((item) => {
					if (item.name === interest.name) {
						item.selected = interest.selected;
					}
				});
				handler((prev) => {
					if (!interest.selected) {
						return {
							...prev,
							interests: prev.interests.filter(
								(item) => item !== interest.name
							),
						};
					}
					return {
						...prev,
						interests: [...prev.interests, interest.name],
					};
				});
			}}
			className={`flex flex-row gap-2 ${
				interest.selected ? "bg-primary-700 text-white" : "bg-transparent"
			} hover:bg-primary-700 hover:text-white hover:cursor-pointer p-5 w-max h-10 border border-white rounded-full justify-center items-center`}
		>
			<div>{interest.name}</div>
			<div>{!interest.selected && <FaPlus className="w-2 h-2" />}</div>
		</div>
	);
}
