import { getaBackendRoute, getJobsRoute } from "@/configs/constants";
import SkeletonDiv from "@/components/Loader/JobListCardSkeleton";
import dynamic from "next/dynamic";
import Pagination from "@/components/Pagination";
import { Suspense } from "react";
import { Job, JobApiFetchProps } from "@/types/custom";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authoptions";
import DashboardNavigation from "@/components/DashboardNavigation/layout";
import { GeistSans } from "geist/font/sans";
import { fetchSavedJobs } from "@/Database/database";
async function fetchSavedJobsData({
	searchParams,
}: {
	searchParams?: {
		username: string | undefined;
	};
}) {
	console.log(searchParams);
	try {
		if (!searchParams?.username) {
			return null;
		}

		const data: { message: string | any[] } = await fetchSavedJobs(
			searchParams?.username
		);

		if (data.data) {
			let jobsData = [];
			let ids = [];

			data.data.forEach((item) => {
				ids.push(item.job_id);
			});

			// Create an array of fetch promises
			const fetchPromises = ids.map((item) =>
				fetch(`${getaBackendRoute()}/api/job/${parseInt(item)}`).then((res) =>
					res.json()
				)
			);

			// Wait for all fetch requests to complete
			const results = await Promise.all(fetchPromises);

			// Process the results and populate jobsData
			results.forEach((result) => {
				jobsData.push(result.data);
			});

			return { jobsData, error: null } as {
				jobsData: Job[];
				error: string | null;
			};
		}

		return { jobsData: null, error: null } as {
			jobsData: Job[] | null;
			error: string | null;
		};
	} catch (error) {
		return { jobsData: null, error: error.message } as {
			jobsData: Job[] | null;
			error: string | null;
		};
	}
}

export default async function SavedJobs() {
	const JobListDiv = dynamic(
		() => import("@/components/JobDataHandler/JobListDiv"),
		{
			ssr: false,
		}
	);
	const session = await getServerSession(authOptions);
	const data = await fetchSavedJobsData({
		searchParams: {
			username: session?.user.username,
		},
	});
	return (
		<>
			{data && data.jobsData && (
				<div className={GeistSans.className}>
					<div className="antialiased bg-transparent min-h-dvh">
						<JobListDiv
							data={data?.jobsData}
							error={data?.error}
						/>
					</div>
				</div>
			)}
		</>
	);
}
