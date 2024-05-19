"use client";
import { DefaultSession } from "next-auth";
import Sidebar from "./DashboardSidebar";
import { useState } from "react";
import Header from "./DashboardHeader";
interface Session {
	user: {
		username: string | null;
	} & DefaultSession["user"];
}
interface props {
	fromMainPage: boolean | undefined;
	session: Session | null;
}
export default function DashboardNavigation({ fromMainPage, session }: props) {
	const [sideBarOpen, setSideBarOpen] = useState(false);

	return (
		<>
			<Header
				fromMainPage={fromMainPage}
				sideBarOpen={sideBarOpen}
				setSideBarOpen={setSideBarOpen}
				session={session}
			/>
			<Sidebar
				fromMainPage={fromMainPage}
				sideBarOpen={sideBarOpen}
				setSideBarOpen={setSideBarOpen}
				session={session}
			/>
		</>
	);
}
