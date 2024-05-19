// next-auth-extensions.d.ts
import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";
import { Database } from "@/supabase";
import { Database } from "firebase/database";
declare module "next-auth" {
	interface Session {
		user: {
			username: string | null;
			avatar: string | null;
			provider: string | undefined;
		} & DefaultSession["user"];
	}
	interface User {
		avatar: string | null;
		bio: string | null;
		cgpa: number | null;
		created_at: string;
		email: string;
		email_verified: boolean | null;
		id: string;
		name: string | null;
		password: string;
		username: string | null;
	}
}

declare module "@auth/core/adapters" {
	interface AdapterUser {
		username: string | null;
		avatar: string | null;
		provider: string | undefined;
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		user: {
			username: string | null;
			avatar: string | null;
			provider: string | undefined;
		} & DefaultSession["user"];
	}
}

interface User {
	username: string | null;
	avatar: string | null;
}
