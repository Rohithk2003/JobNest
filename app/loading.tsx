"use client";
import LoaderCircle from "@/components/LoaderCircle";
export default function Loading() {
	return (
		<div className="w-full h-[100vh] grid place-content-center relative z-[400]">
			<div className="flex flex-row justify-center pl-10 items-center text-white text-lg gap-2">
				<LoaderCircle />
				<p>Loading</p>
			</div>
		</div>
	);
}
