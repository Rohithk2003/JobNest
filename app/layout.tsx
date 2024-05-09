import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import { getServerSession } from "next-auth/next";
import AuthProvider from "./context/AuthProvider";
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
	const session = await getServerSession();

	return (
		<html lang="en">
			<body className={inter.className}>
				<AuthProvider>
					<Header></Header>
					{children}
				</AuthProvider>
			</body>
		</html>
	);
}
