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
}
export default function Header({ session }: Props) {
	useEffect(() => {
		const header = document.querySelector("header");

		window.addEventListener("scroll", () => {
			const scrolledY = window.scrollY;
			if (scrolledY > 0) {
				header?.classList.add("backdrop-blur-lg");
			} else {
				header?.classList.remove("backdrop-blur-lg");
			}
		});
	});
	return (
		<header className="bg-transparent pt-2 fixed z-[1000] w-full ">
			<div className="mx-auto flex h-16 max-w-full-xl items-center gap-8  sm:px-6 ">
				<div className="flex flex-1 items-center justify-end md:justify-center">
					<div className="flex items-center gap-4 absolute right-4">
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
									href="#about"
								>
									About
								</a>
							</li>

							<li>
								<a
									className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
									href="#features"
								>
									Features
								</a>
							</li>

							<li>
								<a
									className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
									href="#pricing"
								>
									Pricing
								</a>
							</li>

							<li>
								<a
									className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
									href="#stats"
								>
									Stats
								</a>
							</li>

							<li>
								<a
									className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
									href="#testimonials"
								>
									Testimonials
								</a>
							</li>

							<li>
								<a
									className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
									href="/contact"
								>
									Contact
								</a>
							</li>
						</ul>
					</nav>
				</div>
			</div>
		</header>
	);
}
