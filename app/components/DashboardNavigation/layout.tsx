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
	session: Session | null;
}
export default function DashboardNavigation() {
	const [sideBarOpen, setSideBarOpen] = useState(false);

	return (
		<>
			<Header
				sideBarOpen={sideBarOpen}
				setSideBarOpen={setSideBarOpen}
			/>
			<Sidebar
				sideBarOpen={sideBarOpen}
				setSideBarOpen={setSideBarOpen}
			/>
		</>
	);
}
