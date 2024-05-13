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
	title: String;
	description: String;
	location: String;
	company: String;
	link: string;
	days: string;
	metadata: string;
}
