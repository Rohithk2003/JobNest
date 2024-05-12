interface SkeletonCardProps {
	title: String;
	description: String;
	location: String;
	company: String;
	link: string;
	days: string;
	metadata: string;
}

export default function Card({
	title,
	description,
	location,
	company,
	link,
	days,
	metadata,
}: SkeletonCardProps) {
	return (
		<div className="relative block overflow-hidden w-[800px] bg-transparent rounded-lg border-[1px] border-gray-700 p-4 sm:p-6 lg:p-8">
			<div className="sm:flex sm:justify-between sm:gap-4">
				<div>
					<a
						href={link}
						className="text-lg hover:underline font-bold text-gray-300 sm:text-xl"
					>
						{title}
					</a>

					<div className="flex flex-row gap-8 justify-start items-center">
						<p className="mt-1 text-xs font-medium text-gray-400">{company}</p>
						<p className="mt-1 text-xs font-medium text-gray-400">{location}</p>
					</div>
				</div>
			</div>
			<div className="mt-2">
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
		</div>
	);
}
