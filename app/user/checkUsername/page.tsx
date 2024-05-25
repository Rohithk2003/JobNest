"use server";
import {
	getDashboardRoute,
	getUsernameCreationRoute,
} from "@/configs/constants";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function CheckUsername() {
	const session = await getServerSession();
	if (session) {
		if ("username" in session.user && session.user.username != null)
			window.location.replace(getDashboardRoute());
		else {
			redirect(getUsernameCreationRoute());
		}
	}
	return <></>;
}
