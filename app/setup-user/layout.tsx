"use client";
import { InfoAddedProvider } from "@/components/Setup-User/InfoAddingContext";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<InfoAddedProvider>
			<section>{children}</section>
		</InfoAddedProvider>
	);
}
