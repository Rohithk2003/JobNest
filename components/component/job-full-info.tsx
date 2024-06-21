import { Button } from "@/components/ui/button";
import { Job } from "@/types/custom";

export async function JobFullInfo({ data }: { data: Job }) {
	return (
		<>
			<div className="flex flex-col min-h-[100vh]">
				<section className="w-full py-12 md:py-24 lg:py-32 px-44 bg-transparent">
					<div className="container grid grid-cols-1 md:grid-cols-[1fr_300px] gap-8 px-4 md:px-6">
						<div className="flex flex-col gap-4">
							<div className="flex items-center gap-4">
								<div>
									<h1 className="text-3xl font-bold">{data.title}</h1>
									<p className="text-gray-500 dark:text-gray-400">
										{data.company}
									</p>
								</div>
							</div>
							<div className="grid gap-6">
								<div>
									<h2 className="text-2xl font-bold">Job Description</h2>
									<p className="text-gray-500 dark:text-gray-400">
										{data.description}
									</p>
								</div>
								<div>
									<h2 className="text-2xl font-bold">Other informations</h2>
									<ul className="list-disc pl-6 text-gray-500 dark:text-gray-400">
										{data.metadata}
									</ul>
								</div>
								<div>
									<h2 className="text-2xl font-bold">Location</h2>
									<ul className="list-disc pl-6 text-gray-500 dark:text-gray-400">
										{data.location}
									</ul>
								</div>{" "}
								<div>
									<h2 className="text-2xl font-bold">Posted</h2>
									<ul className="list-disc pl-6 text-gray-500 dark:text-gray-400">
										{data.days}
									</ul>
								</div>{" "}
								<div>
									<h2 className="text-2xl font-bold">Platform</h2>
									<ul className="list-disc pl-6 text-gray-500 dark:text-gray-400">
										{data.platform}
									</ul>
								</div>
							</div>
						</div>
						<div className="bg-white dark:bg-gray-950 rounded-lg shadow-lg p-6 space-y-4">
							<div>
								<h2 className="text-2xl font-bold">About {data.company}.</h2>
								<p className="text-gray-500 dark:text-gray-400">
									{data.company}. is a leading technology company that
									specializes in building innovative web applications. We are a
									fast-paced, collaborative environment where you can make a
									real impact.
								</p>
							</div>
							<div>
								<h3 className="text-lg font-bold">Company Size</h3>
								<p className="text-gray-500 dark:text-gray-400">
									501-1000 employees
								</p>
							</div>
							<div>
								<h3 className="text-lg font-bold">Industry</h3>
								<p className="text-gray-500 dark:text-gray-400">Technology</p>
							</div>
							<div className="pb-5">
								<h3 className="text-lg font-bold">Location</h3>
								<p className="text-gray-500 dark:text-gray-400">
									San Francisco, CA
								</p>
							</div>
							<a
								href={data.link}
								className="mt-10"
							>
								<Button className="w-full">Apply Now</Button>
							</a>
						</div>
					</div>
				</section>
			</div>
		</>
	);
}
