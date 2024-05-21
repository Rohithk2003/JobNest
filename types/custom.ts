import { Database } from "@/supabase";
import { Session } from "next-auth";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";

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
	country: string | null;
	gender: string | null;
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
export interface RegisterActionProps {
	email: string;
	password: string;
	confirmPassword: string;
	username: string;
}
export interface googleSignInProps {
	setSignUpStarted: Dispatch<SetStateAction<boolean>>;
	setgoogleProviderClicked: Dispatch<SetStateAction<boolean>>;
	router: AppRouterInstance;
}

export interface LoginActionProps {
	email: string;
	password: string;
}
export interface RegisterActionResultProps {
	status: string | null;
	error: string | null;
}
export interface ProfileComponentProps {
	session: Session | null;
	pdfImageUploader: Function;
	handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
	file: File | null;
	handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
	formData: {
		first_name: string;
		last_name: string;
		username: string;
		email: string;
		cgpa: number;
		bio: string;
	};
	setFormData: Dispatch<
		SetStateAction<{
			first_name: string;
			last_name: string;
			username: string;
			email: string;
			cgpa: number;
			bio: string;
		}>
	>;
	setFile: Dispatch<SetStateAction<File | null>>;
	showEdtImage: boolean;
	setShowEdtImage: Dispatch<SetStateAction<boolean>>;
	profileData: UserProps | null | undefined;
}
export interface tableTypes {
	supabaseUser: Database["next_auth"]["Tables"]["users"]["Row"];
	verificationTokens: Database["next_auth"]["Tables"]["VerificationToken"]["Row"];
	resumeUser: Database["next_auth"]["Tables"]["resumeUser"]["Row"];
}
export interface SupabaseError {
	message: string;
	details: string;
}
