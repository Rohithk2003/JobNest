import DashboardNavigation from "../components/DashboardNavigation/layout";
import { getaBackendRoute, getJobsRoute } from "@/configs/constants";
import SkeletonDiv from "../components/Loader/JobListCardSkeleton";
import dynamic from "next/dynamic";
import Pagination from "../components/Pagination";
import { Suspense } from "react";
import { JobApiFetchProps } from "@/types/custom";
import { createClient } from "@/utils/supabase/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authoptions";

async function fetchJobsData({
	searchParams,
}: {
	searchParams?: {
		search?: string;
		page?: number;
	};
}) {
	try {
		const res = await fetch(
			`${getaBackendRoute()}${getJobsRoute()}?page=${
				searchParams?.page ?? 1
			}&search=${searchParams?.search ?? ""}`
		);
		const data: JobApiFetchProps = await res.json();
		const error = res.ok ? null : data;
		return { data, error };
	} catch (error) {
		return { data: null, error };
	}
}

export default async function Dashboard({
	searchParams,
}: {
	searchParams?: {
		search?: string;
		page?: number;
	};
}) {
	const JobListDiv = dynamic(
		() => import("../components/JobDataHandler/JobListDiv"),
		{
			ssr: false,
		}
	);
	const session = await getServerSession(authOptions);
	const { data, error } = await fetchJobsData({ searchParams });
	return (
		<>
			<DashboardNavigation
				fromMainPage={true}
				session={session}
			/>
			<div className="antialiased bg-transparent min-h-dvh">
				{!data && <SkeletonDiv />}
				<Suspense fallback={<SkeletonDiv />}>
					<JobListDiv
						data={data}
						error={error}
					/>
				</Suspense>
				{data && <Pagination jobsData={data} />}
				{data && (
					<div className="w-full text-center pb-20 font-bold text-white text-xl">
						Showing {data.data.jobs.length} jobs of {data.data.total_jobs}
					</div>
				)}
			</div>
		</>
	);
}
