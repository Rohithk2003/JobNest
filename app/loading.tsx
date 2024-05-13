import SkeletonDiv, {
	SkeletonCard,
} from "./components/Loader/JobListCardSkeleton";

export default function Loading() {
	return (
		<div className="w-screen h-screen pt-44 flex justify-center items-start">
			<SkeletonCard />
		</div>
	);
}
