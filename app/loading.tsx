"use client";
import { ThreeDots } from "react-loader-spinner";
import SkeletonDiv, {
	SkeletonCard,
} from "./components/Loader/JobListCardSkeleton";

export default function Loading() {
	return (
		<div className="w-full h-[100vh] grid place-content-center relative z-[400]">
			<div className="flex flex-row justify-center pl-10 items-center text-white text-3xl">
				<h1>Please wait</h1>
				<ThreeDots
					visible={true}
					height="50"
					width="50"
					color="#ffffff"
					radius="9"
					ariaLabel="three-dots-loading"
					wrapperStyle={{}}
					wrapperClass=""
				/>
			</div>
		</div>
	);
}
