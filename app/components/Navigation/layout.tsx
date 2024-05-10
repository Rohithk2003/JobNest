"use client";
import { DefaultSession } from "next-auth";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useState } from "react";
import { redirect } from "next/navigation";
interface Session {
	user: {
		username: string | null;
	} & DefaultSession["user"];
}
interface props {
	session: Session | null;
}
export default function Navigation({ session }: props) {
	const [sideBarOpen, setSideBarOpen] = useState(false);

	return (
		<>
			<Header
				session={session}
				sideBarOpen={sideBarOpen}
				setSideBarOpen={setSideBarOpen}
			/>
			{session?.user ? (
				<Sidebar
					session={session}
					sideBarOpen={sideBarOpen}
					setSideBarOpen={setSideBarOpen}
				/>
			) : null}
		</>
	);
}
