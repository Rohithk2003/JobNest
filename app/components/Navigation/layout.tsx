"use client";
import { DefaultSession } from "next-auth";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useState } from "react";
import { getSession, useSession } from "next-auth/react";
interface Session {
	user: {
		username: string | null;
	} & DefaultSession["user"];
}

export default function Navigation() {
	const { data: clientSession } = useSession();
	const [showSidebar, setShowSidebar] = useState(false);
	return (
		<>
			<Header
				sidebarController={showSidebar}
				sidebarControllerFunction={setShowSidebar}
			/>
			<Sidebar
				sidebarController={showSidebar}
				sidebarControllerFunction={setShowSidebar}
			/>
		</>
	);
}
