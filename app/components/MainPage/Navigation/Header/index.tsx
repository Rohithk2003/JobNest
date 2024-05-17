"use client";
import {
	getIconLocation,
	getLoginRoute,
	getRegisterRoute,
} from "@/configs/constants";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { DefaultSession } from "next-auth";
import { useEffect } from "react";
interface Session {
	user: {
		username: string | null;
	} & DefaultSession["user"];
}
interface Props {
	session: Session | null;
}

const poppins = Poppins({
	weight: ["500"],
	subsets: ["latin"],
});

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
		<header
			className={`bg-transparent pt fixed z-[1000] w-full ${poppins.className}`}
		>
			<div className="mx-auto flex h-20 p-1 max-w-full-xl items-center gap-8  sm:px-6 ">
				<div className="flex flex-1 items-center justify-end md:justify-start">
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
						<ul className="flex items-center justify-start gap-6 text-md">
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
							<li className="hover:translate-y-[-6px] transition-all ease-in-out duration-300">
								<a
									className="text-gray-500  hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
									href="#about"
								>
									About
								</a>
							</li>

							<li className="hover:translate-y-[-6px] transition-all ease-in-out duration-300">
								<a
									className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
									href="#features"
								>
									Features
								</a>
							</li>

							<li className="hover:translate-y-[-6px] transition-all ease-in-out duration-300">
								<a
									className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
									href="#pricing"
								>
									Pricing
								</a>
							</li>

							<li className="hover:translate-y-[-6px] transition-all ease-in-out duration-300">
								<a
									className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
									href="#stats"
								>
									Stats
								</a>
							</li>

							<li className="hover:translate-y-[-6px] transition-all ease-in-out duration-300">
								<a
									className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
									href="#testimonials"
								>
									Testimonials
								</a>
							</li>

							<li className="hover:translate-y-[-6px] transition-all ease-in-out duration-300">
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
