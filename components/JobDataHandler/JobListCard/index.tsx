import { Job, SkeletonCardProps } from "@/types/custom";
import { FaExternalLinkAlt } from "react-icons/fa";

export default function Card({
	id,
	title,
	description,
	location,
	company,
	link,
	days,
	metadata,
	platform,
}: Job) {
	return (
		<div className="relative block overflow-hidden w-[800px] bg-transparent rounded-lg border-[1px] border-gray-700 p-4 sm:p-6 lg:p-8">
			<div className="sm:flex sm:justify-between sm:gap-4">
				<div>
					<div className="w-full flex justify-between items-center">
						<div className="text-lg  font-bold text-gray-300 sm:text-xl">
							{title}
						</div>
					</div>

					<div className="flex mt-3 flex-row gap-8 justify-start items-center">
						<p className="mt-1 text-xs font-medium text-gray-400">{company}</p>
						<p className="mt-1 text-xs font-medium text-gray-400">{location}</p>
					</div>
				</div>
				<a
					href="https://indeed.com"
					className="whitespace-nowrap hover:cursor-pointer rounded-full bg-blue-900 w-16 h-10 text-center flex justify-center items-center text-sm text-white"
				>
					{platform}
				</a>
			</div>
			<div className="mt-4 flex flex-row gap-3">
				{metadata &&
					metadata.split(".").map((meta, index) => {
						return (
							<span
								key={index}
								className="whitespace-nowrap rounded-full bg-blue-900 px-2.5 py-0.5 text-sm text-white"
							>
								{meta}
							</span>
						);
					})}
			</div>
			<div className="mt-4">
				{description &&
					description.split(".").map((desc, index) => (
						<p
							key={index}
							className="text-pretty text-sm text-gray-400"
						>
							{desc}
						</p>
					))}
			</div>

			<div className="flex flex-row justify-between items-center">
				<dl className="mt-6 flex gap-4 sm:gap-6">
					<div className="flex flex-col-reverse">
						<dt className="text-sm font-medium text-gray-500">Published</dt>
						<dd className="text-xs text-gray-500">{days}</dd>
					</div>
					<div className="flex flex-col-reverse">
						<dt className="text-sm font-medium text-gray-500">Reading time</dt>
						<dd className="text-xs text-gray-500">3 minute</dd>
					</div>
				</dl>
				<a
					href={`/platform/${platform}/job/${id}`}
					className="whitespace-nowrap rounded-full hover:cursor-pointer  bg-blue-900 w-20 gap-3	hover:bg-white hover:text-black transition-all ease-in-out duration-500 h-10 text-center flex justify-center items-center text-sm text-white"
				>
					Apply <FaExternalLinkAlt />
				</a>
			</div>
		</div>
	);
}
