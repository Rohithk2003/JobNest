"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { update } from "firebase/database";
import { JobApiFetchProps } from "@/types/custom";
function UpdateUrl({
	page,
	searchParams,
	replace,
	pathname,
}: {
	page: number;
	searchParams: URLSearchParams;
	replace: (href: string, options?: NavigateOptions) => void;
	pathname: string;
}) {
	const params = new URLSearchParams(searchParams);
	if (page) {
		params.set("page", page.toString());
	} else {
		params.delete("page");
	}
	replace(`${pathname}?${params.toString()}`);
}
export default function Pagination({
	jobsData,
}: {
	jobsData: JobApiFetchProps;
}) {
	const [page, setPage] = useState<number>(1);
	const [total_pages, setTotalPages] = useState(0);
	const [visiblePages, setVisiblePages] = useState<number[]>([]);
	const [pageStartNumber, setPageStartNumber] = useState<number>(1);
	const searchParams = useSearchParams();
	const { replace } = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		setTotalPages(jobsData?.data?.total_pages);
		let pages = [];
		for (
			let i = pageStartNumber;
			i < pageStartNumber + 3 && i <= jobsData?.data?.total_pages;
			i++
		) {
			pages.push(i);
		}
		setVisiblePages(pages);
	}, [total_pages, jobsData, pageStartNumber]);

	return (
		<ol className="flex justify-center gap-1 p-10 h-32 text-xs font-medium">
			<li>
				<div
					onClick={() => {
						if (page > 1) {
							setPage(page - 1);
							setPageStartNumber(page - 1);
							UpdateUrl({ page: page - 1, searchParams, replace, pathname });
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
							UpdateUrl({ page: page, searchParams, replace, pathname });
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
							UpdateUrl({ page: page + 1, searchParams, replace, pathname });
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
	);
}
