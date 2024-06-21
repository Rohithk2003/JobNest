import NextAuth, { Account, User } from "next-auth";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { SupabaseAdapter } from "@auth/supabase-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { createClient } from "@/utils/supabase/client";
import type { Adapter, AdapterUser } from "next-auth/adapters";
import { getLoginRoute, tables } from "@/configs/constants";
import { getUserByEmail } from "@/Database/database";
const bcrypt = require("bcrypt");

const supabase = createClient();

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!;
export const authOptions: NextAuthOptions = {
	pages: {
		signIn: "/login",
		error: "/login",
		signOut: "/welcome",
	},
	session: {
		strategy: "jwt",
	},
	secret: process.env.NEXTAUTH_SECRET,

	providers: [
		CredentialsProvider({
			id: "customsignin",
			name: "customsignin",
			type: "credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials, req) {
				try {
					if (!credentials || !credentials.email || !credentials.password) {
						throw new Error("Email and password are required.");
					}
					const { email, password } = credentials;
					const { data: user, error } = await getUserByEmail(email);
					if (error) {
						throw "No user exists";
					}
					if (!user) {
						throw "No user exists";
					}
					const passwordsMatch = await bcrypt.compareSync(
						password,
						user.password
					);
					if (user && passwordsMatch) {
						const { password, ...userWithoutSensitiveInfo } = user;
						return userWithoutSensitiveInfo as unknown as User;
					} else {
						throw "Invalid password";
					}
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
		GithubProvider({
			clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID!,
			clientSecret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET!,
		}),
	],
	adapter: SupabaseAdapter({
		url: process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL!,
		secret: process.env.NEXT_PUBLIC_SUPABASE_PROJECT_SERVICE_KEY!,
	}) as Adapter,
	callbacks: {
		async signIn({ user, account }) {
			if (account?.provider === "google") {
				return true;
			}
			if (user?.emailVerified) {
				return true;
			} else {
				return false;
			}
		},
		jwt: async ({ token, trigger, account, profile, session, user }) => {
			if (user) {
				token.user = {
					username: user.username,
					provider: account?.provider,
					image: user.image,
					email: user.email,
				};
			}
			if (trigger === "update" && session.user) {
				token.user = session.user;
			}

			return token;
		},
		session: async ({ session, token }) => {
			session.user = token.user;
			return session;
		},
	},
};
