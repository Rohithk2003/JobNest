"use client";
import { DefaultSession } from "next-auth";
import Header from "./Header";
interface Session {
	user: {
		username: string | null;
	} & DefaultSession["user"];
}
interface props {
	session: Session | null;
}
export default function Navigation({ session }: props) {
	return (
		<>
			<Header session={session} />
		</>
	);
}
