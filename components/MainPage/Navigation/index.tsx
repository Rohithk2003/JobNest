import {
	getDashboardRoute,
	getIconLocation,
	getLoginRoute,
	getRegisterRoute,
} from "@/configs/constants";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { GeistSans } from "geist/font/sans";
import {authOptions} from "@/app/api/auth/[...nextauth]/authoptions";
import {useSession} from "next-auth/react";

export default  function Navigation() {
	const {data:session} =  useSession();
	return (
		<header
			className={`bg-transparent pt fixed z-[1000] w-full ${GeistSans.className}`}
		>
			<div className="mx-auto flex h-20 p-1 max-w-full-xl items-center gap-8  sm:px-6 ">
				<div className="flex flex-1 items-center justify-end md:justify-start">
					<div className="flex items-center gap-4 absolute right-4">
						{session ? (
							<>
								<div>{session.user.username}</div>
								<div>
									<a
										className="block rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
										href={getDashboardRoute()}
									>
										Dashboard
									</a>
								</div>
							</>
						) : (
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
						)}
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
