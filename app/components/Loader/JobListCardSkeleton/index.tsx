import Skeleton from "react-loading-skeleton";

export function SkeletonCard() {
	return (
		<div className="relative  overflow-hidden w-[800px] bg-transparent flex flex-col gap-5 rounded-lg border-[1px] border-gray-700  p-4 sm:p-6 lg:p-8">
			<div className="absolute right-0 top-0">
				<Skeleton
					baseColor="#313131"
					highlightColor="#525252"
					className="absolute right-7 top-8"
					width={50}
					height={50}
				/>
			</div>
			<Skeleton
				baseColor="#313131"
				highlightColor="#525252"
				width={450}
			/>

			<Skeleton
				baseColor="#313131"
				highlightColor="#525252"
				width={100}
			/>
			<Skeleton
				count={2}
				baseColor="#313131"
				highlightColor="#525252"
				width={600}
			/>
			<div className="flex flex-row gap-20 flex-wrap">
				<Skeleton
					count={2}
					baseColor="#313131"
					highlightColor="#525252"
					width={100}
				/>
				<Skeleton
					count={2}
					baseColor="#313131"
					highlightColor="#525252"
					width={100}
				/>
			</div>
		</div>
	);
}
export default function SkeletonDiv() {
	return (
		<div className="flex flex-col justify-center items-center pt-10">
			<SkeletonCard />
			<SkeletonCard />
			<SkeletonCard />
			<SkeletonCard />
		</div>
	);
}
