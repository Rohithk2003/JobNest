"use client";
import { GeistSans } from "geist/font/sans";
import Head from "next/head";

export default function Home() {
	const navigation = [
		{ title: "Features", path: "javascript:void(0)" },
		{ title: "Integrations", path: "javascript:void(0)" },
		{ title: "Customers", path: "javascript:void(0)" },
		{ title: "Pricing", path: "javascript:void(0)" },
	];

	return (
		<div className={GeistSans.className}>
			<Head>
				<link
					rel="icon"
					href="/favicon.ico"
					sizes="any"
				/>
			</Head>
		</div>
	);
}
