import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import {
	getCheckUsernameRoute,
	getDashboardRoute,
	getLoginRoute,
	getProfileRoute,
	getRegisterRoute,
	getSignOutRoute,
	getUsernameCreationRoute,
} from "./configs/constants";

export default withAuth(async function middleware(req) {
	const token = await getToken({ req });
	const isAuthenticated = !!token;
	if (
		req.nextUrl.pathname.startsWith(getLoginRoute()) ||
		req.nextUrl.pathname.startsWith(getRegisterRoute()) ||
		req.nextUrl.pathname.startsWith(getUsernameCreationRoute()) ||
		req.nextUrl.pathname.startsWith(getCheckUsernameRoute()) ||
		req.nextUrl.pathname.startsWith(getProfileRoute()) ||
		req.nextUrl.pathname.startsWith(getSignOutRoute())
	) {
		if (isAuthenticated) {
			return NextResponse.redirect(new URL(getDashboardRoute(), req.url));
		}
	}
	if (
		req.nextUrl.pathname.startsWith(getDashboardRoute()) ||
		req.nextUrl.pathname.startsWith(getProfileRoute()) ||
		req.nextUrl.pathname.startsWith(getCheckUsernameRoute()) ||
		req.nextUrl.pathname.startsWith(getUsernameCreationRoute()) ||
		req.nextUrl.pathname.startsWith(getSignOutRoute()) ||
		req.nextUrl.pathname.startsWith(getLoginRoute())
	) {
		if (!isAuthenticated) {
			return NextResponse.redirect(new URL(getLoginRoute(), req.url));
		}
	}
});
export const config = {
	matcher: [
		"/dashboard",
		"/user/createUsername",
		"/user/checkUsername",
		"/user/profile",
	],
};
