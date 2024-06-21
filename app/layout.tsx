import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "./context/AuthProvider";
import "react-loading-skeleton/dist/skeleton.css";
import PrelineScript from "@/components/PrelineScript";
import { ViewTransitions } from "next-view-transitions";
import "react-toastify/dist/ReactToastify.css";
import { GeistSans } from "geist/font/sans";

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
		<ViewTransitions>
			<html
				lang="en"
				className={GeistSans.className}
			>
				<body className={inter.className}>
					<AuthProvider>
						{children}
						<PrelineScript />
					</AuthProvider>
				</body>
			</html>
		</ViewTransitions>
	);
}
