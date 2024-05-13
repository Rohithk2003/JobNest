import Skeleton from "react-loading-skeleton";

export default function ProfileImageSkeleton() {
	return (
		<div className="flex flex-col  justify-center items-center rounded-full">
			<Skeleton
				baseColor="#313131"
				highlightColor="#525252"
				className="w-full h-full p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
				width={160}
				circle={true}
				height={160}
			/>
		</div>
	);
}
