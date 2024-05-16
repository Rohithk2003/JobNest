export interface JobApiFetchProps {
	status: String;
	data: JobDataProps;
}
export interface JobDataProps {
	jobs: Job[];
	has_next: boolean;
	has_prev: boolean;
	total_pages: number;
	total_jobs: number;
}
export interface Job {
	id: number;
	title: String;
	description: String;
	location: String;
	company: String;
	link: string;
	days: string;
	metadata: string;
	platform: string;
}
export interface UserProps {
	name: string | null;
	email: string | null;
	username: string | null;
	image: string | null;
	provider: string | null;
	cgpa: number | null;
	id: string;
	emailVerified: boolean | null;
	bio: string | null;
}
export interface SupabaseUpdateProps {
	status: String;
	statusText: String | null;
}
export interface SkeletonCardProps {
	id: number;
	title: String;
	description: String;
	location: String;
	company: String;
	link: string;
	days: string;
	metadata: string;
	platform: string;
}
