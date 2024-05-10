"use client";
import {
	getIconLocation,
	getLoginRoute,
	getRegisterRoute,
} from "@/configs/constants";
import Image from "next/image";
import { DefaultSession, getServerSession } from "next-auth";
import { Dispatch, SetStateAction, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
interface Session {
	user: {
		username: string | null;
	} & DefaultSession["user"];
}
interface Props {
	session: Session | null;
	sideBarOpen: boolean;
	setSideBarOpen: Dispatch<SetStateAction<boolean>>;
}
export default function Header({
	session,
	sideBarOpen,
	setSideBarOpen,
}: Props) {
	console.log(session);
	return (
		<header className="bg-transparent pt-2  z-[500] relative">
			<div className="mx-auto flex h-16 max-w-full-xl items-center gap-8  sm:px-6 ">
				<div className="flex flex-1 items-center justify-end md:justify-center">
					<div className="flex items-center gap-4 absolute right-4">
						{!session ? (
							<div className="sm:flex sm:gap-4">
								<a
									className="block rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
									href={getLoginRoute()}
								>
									{"Login"}
								</a>

								<a
									className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 transition hover:text-teal-600/75 sm:block dark:bg-gray-800 dark:text-white dark:hover:text-white/75"
									href={getRegisterRoute()}
								>
									Register
								</a>
							</div>
						) : (
							<div className="bg-transparent flex flex-row items-center justify-center gap-10 mr-5">
								<button
									onClick={() => {
										setSideBarOpen(!sideBarOpen);
									}}
									className="block rounded bg-transparent p-2.5 text-white transition "
								>
									<span className="sr-only">Toggle menu</span>
									{sideBarOpen ? (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-5 w-5"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											strokeWidth="2"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M6 18L18 6M6 6l12 12"
											/>
										</svg>
									) : (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-5 w-5"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											strokeWidth="2"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M4 6h16M4 12h16M4 18h16"
											/>
										</svg>
									)}
								</button>
							</div>
						)}
					</div>
					<nav
						aria-label="Global"
						className="hidden md:block"
					>
						<ul className="flex items-center gap-6 text-sm">
							<li>
								<a
									className="block text-teal-600 dark:text-teal-300"
									href="/"
								>
									<span className="sr-only">Home</span>
									<Image
										src={getIconLocation()}
										alt="Icon"
										width={64}
										height={64}
									/>
								</a>
							</li>
							<li>
								<a
									className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
									href="#"
								>
									About
								</a>
							</li>

							<li>
								<a
									className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
									href="#"
								>
									Careers
								</a>
							</li>

							<li>
								<a
									className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
									href="#"
								>
									History
								</a>
							</li>

							<li>
								<a
									className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
									href="#"
								>
									Services
								</a>
							</li>

							<li>
								<a
									className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
									href="#"
								>
									Projects
								</a>
							</li>

							<li>
								<a
									className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
									href="#"
								>
									Blog
								</a>
							</li>
						</ul>
					</nav>
				</div>
			</div>
		</header>
	);
}
