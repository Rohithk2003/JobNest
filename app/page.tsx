import Image from "next/image";
import Header from "./components/Header";
import Head from "next/head";
import { getServerSession } from "next-auth";
export default async function Home() {
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
