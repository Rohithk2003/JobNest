import Skeleton from "react-loading-skeleton";
interface ProfileImageSkeletonProps {
	width?: number;
	height?: number;
}
export default function ProfileImageSkeleton({
	width,
	height,
}: ProfileImageSkeletonProps) {
	return (
		<div className={`flex flex-col  justify-center items-center rounded-full `}>
			<Skeleton
				baseColor="#313131"
				highlightColor="#525252"
				className="w-full h-full p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
				width={width || 160}
				circle={true}
				height={height || 160}
			/>
		</div>
	);
}
