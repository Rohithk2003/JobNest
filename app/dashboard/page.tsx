"use client";
import useSWR from "swr";

import Skeleton from "react-loading-skeleton";
import DashboardNavigation from "../components/DashboardNavigation/layout";
import { useEffect, useId, useState } from "react";
import Card from "../components/JobListCard";
import SkeletonCard from "../components/JobListCardSkeleton";
import { getaBackendRoute, getJobsRoute } from "@/configs/constants";
import { set } from "firebase/database";
interface JobApiFetchProps {
	status: String;
	data: JobDataProps;
}
interface JobDataProps {
	jobs: JopProps[];
	has_next: boolean;
	has_prev: boolean;
	total_pages: number;
}
interface JopProps {
	title: String;
	description: String;
	location: String;
	company: String;
	link: string;
	days: string;
	metadata: string;
}

export default function Dashboard() {
	const [page, setPage] = useState<number>(1);
	const [total_pages, setTotalPages] = useState(0);
	const [pagesList, setPagesList] = useState<number[]>([]);
	const [visiblePages, setVisiblePages] = useState<number[]>([]);
	const [pageStartNumber, setPageStartNumber] = useState<number>(1);

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
		`${getaBackendRoute()}${getJobsRoute()}/page=${page}`,
		fetcher
	);
	useEffect(() => {
		setTotalPages(data?.data?.total_pages);
		let pages = [];
		for (
			let i = pageStartNumber;
			i < pageStartNumber + 3 && i <= data?.data?.total_pages;
			i++
		) {
			pages.push(i);
		}
		setVisiblePages(pages);
		pages = [];
		for (let i = 1; i <= data?.data?.total_pages; i++) {
			pages.push(i);
		}
		setPagesList(pages);
	}, [setPagesList, total_pages, data, pageStartNumber]);
	return (
		<>
			<DashboardNavigation />
			<div className="antialiased bg-transparent min-h-dvh">
				<main className="p-16 h-auto flex flex-col gap-6 justify-center items-center">
					{isLoading && (
						<>
							<SkeletonCard />
							<SkeletonCard />
							<SkeletonCard />
							<SkeletonCard />
						</>
					)}
					{error && (
						<div className="text-3xl mt-44 animate-bounce">
							Failed to load!.Server is down.Please try again later.
						</div>
					)}
					{data &&
						data.data &&
						data.data.jobs.map((job: JobProps, index: number) => (
							<div key={index}>
								<Card {...job} />
							</div>
						))}
				</main>

				<ol className="flex justify-center gap-1 p-10 h-32 text-xs font-medium">
					<li>
						<div
							onClick={() => {
								if (page > 1) {
									setPage(page + 1);
									setPageStartNumber(page + 1);
								}
							}}
							className="inline-flex size-8 items-center hover:cursor-pointer hover:bg-slate-50 justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180 dark:border-gray-800 dark:bg-gray-900 dark:text-white"
						>
							<span className="sr-only">Prev Page</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-3 w-3"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fill-rule="evenodd"
									d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
									clip-rule="evenodd"
								/>
							</svg>
						</div>
					</li>

					{visiblePages.map((page, index) => (
						<li key={index}>
							<div
								onClick={() => {
									setPage(page);
									setPageStartNumber(page);
								}}
								className="block size-8 hover:cursor-pointer hover:bg-slate-500 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900 dark:border-gray-800 dark:bg-gray-900 dark:text-white"
							>
								{`${page}`}
							</div>
						</li>
					))}
					<li>
						<div
							onClick={() => {
								if (page < total_pages) {
									setPage(page + 1);
									setPageStartNumber(page + 1);
								}
							}}
							className="inline-flex size-8 items-center justify-center hover:cursor-pointer hover:bg-slate-500 rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180 dark:border-gray-800 dark:bg-gray-900 dark:text-white"
						>
							<span className="sr-only">Next Page</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-3 w-3"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fill-rule="evenodd"
									d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
									clip-rule="evenodd"
								/>
							</svg>
						</div>
					</li>
				</ol>
			</div>
		</>
	);
}
