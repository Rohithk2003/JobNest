import { Job, JobApiFetchProps } from "@/types/custom";
import Card from "../JobListCard";

export default function JobListDiv({
	data,
	error,
}: {
	data: JobApiFetchProps;
	error: any;
}) {
	return (
		<main className="p-16 h-auto flex flex-col gap-6 justify-center items-center">
			{error && (
				<div className="text-3xl mt-44 animate-bounce">
					Failed to load!.Server is down.Please try again later.
				</div>
			)}
			{data &&
				data.data &&
				data.data.jobs.map((job: Job, index: number) => (
					<div key={index}>
						<Card {...job} />
					</div>
				))}
		</main>
	);
}
