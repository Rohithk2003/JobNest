"use client";
import {
	getIconLocation,
	getLoginRoute,
	getRegisterRoute,
} from "@/configs/constants";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Header() {
	const { data: session } = useSession({
		required: false,
	});
	useEffect(() => {
		if (session) {
		}
	});
	return (
		<header className="bg-white dark:bg-gray-900">
			<div className="mx-auto flex h-16 max-w-full-xl items-center gap-8  sm:px-6 ">
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

				<div className="flex flex-1 items-center justify-end md:justify-between">
					<nav
						aria-label="Global"
						className="hidden md:block"
					>
						<ul className="flex items-center gap-6 text-sm">
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

					<div className="flex items-center gap-4">
						{!session ? (
							<div className="sm:flex sm:gap-4">
								<a
									className="block rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
									href={getLoginRoute()}
								>
									Login
								</a>

								<a
									className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 transition hover:text-teal-600/75 sm:block dark:bg-gray-800 dark:text-white dark:hover:text-white/75"
									href={getRegisterRoute()}
								>
									Register
								</a>
							</div>
						) : (
							<div className="text-white flex flex-row items-center justify-center gap-10 mr-5">
								<div className="flex flex-row justify-center items-center gap-5">
									{session.user?.image && (
										<Image
											src={session.user?.image}
											alt="User"
											width={40}
											height={40}
											className="rounded-full"
										/>
									)}
									<p>{session.user?.email}</p>
									<p>{session.user?.username}</p>
								</div>
								<button
									className="block rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
									onClick={() => {
										signOut();
									}}
								>
									LogOut
								</button>
							</div>
						)}
						<button className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden dark:bg-gray-800 dark:text-white dark:hover:text-white/75">
							<span className="sr-only">Toggle menu</span>
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
						</button>
					</div>
				</div>
			</div>
		</header>
	);
}
