"use client";
import { DefaultSession, Session } from "next-auth";
import Sidebar from "./DashboardSidebar";
import { useState } from "react";
import Header from "./DashboardHeader";

interface props {
	fromMainPage: boolean | undefined;
	session: Session | null;
}
export default function DashboardNavigation({ fromMainPage, session }: props) {
	const [sideBarOpen, setSideBarOpen] = useState(false);

	return (
		<div className="relative z-[2000]">
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
		</div>
	);
}
