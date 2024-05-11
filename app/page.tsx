"use client";
import Head from "next/head";

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
		</>
	);
}
