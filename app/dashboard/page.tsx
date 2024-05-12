"use client";
import useSWR from "swr";

import Skeleton from "react-loading-skeleton";
import DashboardNavigation from "../components/DashboardNavigation/layout";
import { useEffect, useId, useState } from "react";
import Card from "../components/JobListCard";
import SkeletonCard from "../components/JobListCardSkeleton";
import { getaBackendRoute, getJobsRoute } from "@/configs/constants";
interface JobApiFetchProps {
	status: String;
	data: JobDataProps[];
}
interface JobDataProps {
	title: String;
	description: String[];
	location: String;
	company: String;
	link: string;
	days: string;
	metadata: string[];
}

export default function Dashboard() {
	const fetcher = (...args) =>
		fetch(...args, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		}).then((res) => res.json());
	const {
		data,
		error,
		isLoading,
	}: { data: JobApiFetchProps; error: any; isLoading: boolean } = useSWR(
		`${getaBackendRoute()}${getJobsRoute()}`,
		fetcher
	);

	const [loading, setLoading] = useState(true);
	const [text, setText] = useState("");
	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
			setText("Dashboard");
		}, 4000);
	});
	return (
		<>
			<DashboardNavigation />
			<div className="antialiased bg-transparent">
				<main className="p-16 h-auto flex flex-col gap-6 justify-center items-center">
					{isLoading && (
						<>
							<SkeletonCard />
							<SkeletonCard />
							<SkeletonCard />
							<SkeletonCard />
						</>
					)}
					{error && <div>Failed to load</div>}
					{data &&
						data.data &&
						data.data.map((job: JobDataProps, index: number) => (
							<div key={index}>
								<Card {...job} />
							</div>
						))}
				</main>
			</div>
		</>
	);
}
