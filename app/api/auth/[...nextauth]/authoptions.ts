import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { SupabaseAdapter } from "@auth/supabase-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { createClient } from "@/utils/supabase/client";
import type { Adapter } from "next-auth/adapters";

const bcrypt = require("bcrypt");

interface Credentials {
	email: string;
	password: string;
}

const supabase = createClient();

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!;
export const authOptions: NextAuthOptions = {
	pages: {
		signIn: '/user/login',
		signOut: '/user/register',
		error: '/user/login',
	},
	session: {
		strategy: "jwt",
	},
	secret: process.env.NEXTAUTH_SECRET,

	providers: [
		CredentialsProvider({
			id: "custom-signin",
			type: "credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" }
			},
			async authorize(credentials) {
				try {
					if (!credentials || !credentials.email || !credentials.password) {
						throw new Error("Email and password are required.");
					}
					const { email, password } = credentials;
					const { data: user, error } = await supabase
						.schema("next_auth")
						.from("credentials")
						.select("*")
						.eq("email", email)
						.single();
					if (error) {
						throw "No user exists";
					}
					const passwordsMatch = await bcrypt.compareSync(credentials.password, user.password);
					if (user && passwordsMatch) {
						const { password, createdAt, id, ...userWithoutSensitiveInfo } =
							user;
						return userWithoutSensitiveInfo;
					}
					return user;
				} catch (error: any) {
					console.error("Error fetching user data:", error);
					throw new Error(error, {
						cause: "No user exists",
					});
				}
			},
		}),
		CredentialsProvider({
			id: "custom-signup",
			type: "credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
				username: { label: "Username", type: "text" }

			},
			async authorize(credentials) {
				try {
					if (!credentials || !credentials.email || !credentials.password) {
						throw new Error("Email and password are required.");
					}
					const hashedPassword = await bcrypt.hash(credentials.password, 10);
					const { data: user, error } = await supabase
						.schema("next_auth")
						.from("credentials")
						.insert([
							{ email: credentials.email, password: hashedPassword, username: credentials.username },
						]);

					if (error == null) {
						return null
					}
					if (error) {
						throw new Error(error.details, {
							cause: "No user exists",
						});
					}
					return user;
				} catch (error: any) {
					console.error("Error fetching user data:", error);
					throw new Error(error, {
						cause: "No user exists",
					});
				}
			},
		}),
		GoogleProvider({
			clientId: GOOGLE_CLIENT_ID,
			clientSecret: GOOGLE_CLIENT_SECRET,
		}),
	],
	adapter: SupabaseAdapter({
		url: process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL!,
		secret: process.env.NEXT_PUBLIC_SUPABASE_PROJECT_SERVICE_KEY!,
	}) as Adapter,
	callbacks: {
		jwt: async ({ token, trigger, session, user }) => {
			if (trigger === "update" && session.user) {
				token.user = session.user
			}
			user && (token.user = user)
			return token
		},
		session: async ({ session, token }) => {
			session.user = token.user
			return session
		}

	},
};
