import Head from "next/head";
import { useState, useEffect } from "react";
import BackgroundGlow from "./components/BackgroundGlow";
import { getLoginRoute } from "@/configs/constants";

export default function Home() {
	const navigation = [
		{ title: "Features", path: "javascript:void(0)" },
		{ title: "Integrations", path: "javascript:void(0)" },
		{ title: "Customers", path: "javascript:void(0)" },
		{ title: "Pricing", path: "javascript:void(0)" },
	];

	return (
		<>
			<Head>
				<link
					rel="icon"
					href="/favicon.ico"
					sizes="any"
				/>
			</Head>

			<div className="bg-gray-900">
				<section className="relative">
					<div className="relative z-[10] max-w-screen-xl mx-auto px-4 py-28 md:px-8">
						<div className="space-y-5 max-w-4xl mx-auto text-center">
							<h2 className="text-4xl text-white font-extrabold mx-auto md:text-5xl">
								Unlock Your Career Potential: Upload Resume, Discover
								Opportunities
							</h2>
							<p className="max-w-2xl mx-auto text-gray-400">
								Your personalized job matchmaker. Upload your resume, discover
								tailored job suggestions. Find your perfect career fit today!
							</p>
							<div className="justify-center items-center gap-x-3 sm:flex">
								<a
									href={getLoginRoute()}
									className="flex items-center justify-center gap-x-2 py-2.5 px-4 mt-3 w-full text-sm text-white font-medium bg-primary-500 duration-150 rounded-lg sm:mt-0 sm:w-auto"
								>
									Get started
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
										fill="currentColor"
										className="w-5 h-5"
									>
										<path
											fillRule="evenodd"
											d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z"
											clipRule="evenodd"
										/>
									</svg>
								</a>
							</div>
							<div className="flex justify-center items-center gap-x-4 text-gray-400 text-sm">
								<div className="flex">
									<svg
										className="w-5 h-5 text-yellow-300"
										xmlns="http://www.w3.org/2000/svg"
										fill="currentColor"
										viewBox="0 0 20 20"
									>
										<path d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" />
									</svg>
									<svg
										className="w-5 h-5 text-yellow-300"
										xmlns="http://www.w3.org/2000/svg"
										fill="currentColor"
										viewBox="0 0 20 20"
									>
										<path d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" />
									</svg>
									<svg
										className="w-5 h-5 text-yellow-300"
										xmlns="http://www.w3.org/2000/svg"
										fill="currentColor"
										viewBox="0 0 20 20"
									>
										<path d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" />
									</svg>
									<svg
										className="w-5 h-5 text-yellow-300"
										xmlns="http://www.w3.org/2000/svg"
										fill="currentColor"
										viewBox="0 0 20 20"
									>
										<path d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" />
									</svg>
									<svg
										className="w-5 h-5"
										xmlns="http://www.w3.org/2000/svg"
										fill="currentColor"
										viewBox="0 0 20 20"
									>
										<path d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" />
									</svg>
								</div>
								<p>
									<span className="text-gray-100">4.0</span> by over 200 users
								</p>
							</div>
						</div>
					</div>
					<BackgroundGlow />
				</section>
			</div>
		</>
	);
}
