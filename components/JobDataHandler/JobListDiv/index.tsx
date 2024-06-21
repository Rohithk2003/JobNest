import { Job, JobApiFetchProps } from "@/types/custom";
import Card from "../JobListCard";
import { ServerDown } from "@/components/component/server-down";

export default function JobListDiv({
	data,
	error,
}: {
	data: JobApiFetchProps | null;
	error: any;
}) {
	return (
		<main
			className={`${error ? "p-0" : "p-16"} ${
				error && "overflow-hidden"
			} h-auto flex flex-col gap-6 justify-center items-center`}
		>
			{error && <ServerDown />}
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
