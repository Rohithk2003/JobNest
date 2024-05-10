import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth/next";
import AuthProvider from "./context/AuthProvider";
import { authOptions } from "@/app/api/auth/[...nextauth]/authoptions";
import Navigation from "./components/Navigation/layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "JobNest	",
	description: "Your all in one job searching platform",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<AuthProvider>
					<Navigation></Navigation>
					{children}
				</AuthProvider>
			</body>
		</html>
	);
}
