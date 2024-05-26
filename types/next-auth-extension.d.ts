// next-auth-extensions.d.ts
import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
export interface CommonUser {
	username: string;
	provider: string | undefined;
	bio: string | null;
	cgpa: number | null;
	created_at: string;
	email: string;
	emailVerified: boolean | null;
	id: string;
	name: string | null;
	password: string;
	image: string | null;
	age: number | null;
	dob: string | null;
	address: string | null;
	city: string | null;
	state: string | null;
	zip_code: string | null;
	interests: string | null;
}
export interface AuthUserProps {
	username: string;
	provider: string | undefined;
	image: string | null | undefined;
	email: string | null | undefined;
}
declare module "next-auth" {
	interface Session {
		user: {} & AuthUserProps;
	}
	interface User extends CommonUser {}
}

declare module "@auth/core/adapters" {
	interface AdapterUser extends CommonUser {}
}

declare module "next-auth/jwt" {
	interface JWT {
		user: {} & AuthUserProps;
	}
}
