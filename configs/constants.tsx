import { Database } from "@/types/supabase";

export function getLoginRoute(): string {
	return "/login";
}
export function getRegisterRoute(): string {
	return "/register";
}

export function getIconLocation(): string {
	return "/icons/icon.png";
}
export function getTermsRoute(): string {
	return "/terms";
}

export function getUsernameCreationRoute(): string {
	return "/user/createUsername";
}

export function getProfileRoute(): string {
	return "/user/profile";
}

export function getSignOutRoute(): string {
	return "/user/logout";
}

export function getHomeRoute(): string {
	return "/welcome";
}
export function getaBackendRoute(): string {
	return "http://127.0.0.1:8000";
}
export function getJobsRoute(): string {
	return "/api/getJobs";
}
export function getCheckUsernameRoute(): string {
	return "/user/checkUsername";
}
export function getContactRoute(): string {
	return "/contact";
}
export function getDashboardRoute(): string {
	return "/dashboard";
}

export function getHelpRoute(): string {
	return "/customer-support";
}
export function getFAQRoute(): string {
	return "/faq";
}
export function getSendEmailVerificationRoute(): string {
	return "/send-verification-email";
}
export function getUserSetupRoute(): string {
	return "/setup-user";
}

export const getForgotPasswordRoute = (): string => {
	return "/forgot-password";
};
export const profileTab = "profile";
export const accountSettingsTab = "accountSettings";
export const premiumTab = "premium";
export const savedTab = "saved";
export const tables = {
	supabaseUsers: "users",
	verificationTokens: "VerificationToken",
	resumeUserLink: "resumeUser",
};
