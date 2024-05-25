"use client";
import BackgroundGlow from "@/app/components/VisualComponents/BackgroundGlow";
import { signOut } from "next-auth/react";
import { useEffect } from "react";
import { InfinitySpin } from "react-loader-spinner";

export default function SignoutPage() {
	useEffect(() => {
		const signout = async () => {
			await signOut({ callbackUrl: "/welcome" });
		};
		signout();
	});
	return (
		<>
			<div className="w-full h-[100vh] grid place-content-center relative z-[400]">
				<div className="flex flex-row justify-center pl-10 items-center text-white text-3xl">
					<h1>Signing out... Please wait</h1>
					<InfinitySpin
						width="200"
						color="#4fa94d"
					/>
				</div>
			</div>
			<BackgroundGlow />
		</>
	);
}
