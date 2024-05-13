import SkeletonDiv, {
	SkeletonCard,
} from "./components/JobDataHandler/JobListCardSkeleton";

export default function Loading() {
	return (
		<div className="w-screen h-screen flex justify-center items-start">
			<SkeletonCard />
		</div>
	);
}
