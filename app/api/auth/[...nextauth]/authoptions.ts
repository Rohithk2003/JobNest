import NextAuth, { Account, User } from "next-auth";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { SupabaseAdapter } from "@auth/supabase-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { createClient } from "@/utils/supabase/client";
import type { Adapter, AdapterUser } from "next-auth/adapters";
import { getLoginRoute } from "@/configs/constants";
import { getCredentialUserByEmail } from "@/Database/database";
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
						.maybeSingle();
					if (error) {
						throw "No user exists";
					}
					if (!user) {
						throw "No user exists";
					}
					const passwordsMatch = await bcrypt.compareSync(
						credentials.password,
						user.password
					);
					if (user && passwordsMatch) {
						const { password, created_at, id, ...userWithoutSensitiveInfo } =
							user;
						return userWithoutSensitiveInfo;
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
		CredentialsProvider({
			id: "customsignup",
			name: "customsignup",
			type: "credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
				username: { label: "Username", type: "text" },
			},
			async authorize(credentials) {
				try {
					if (!credentials || !credentials.email || !credentials.password) {
						throw new Error("Email and password are required.");
					}
					const hashedPassword = await bcrypt.hash(credentials.password, 10);
					let { data: user, error } = await supabase
						.schema("next_auth")
						.from("credentials")
						.insert([
							{
								email: credentials.email,
								password: hashedPassword,
								username: credentials.username,
							},
						]);
					console.log(user, error);
					if (error) {
						throw new Error(error.details, {
							cause: "User already exists",
						});
					} else {
						let { data: user } = await supabase
							.schema("next_auth")
							.from("credentials")
							.select("*")
							.eq("email", credentials.email);
						return user && user[0];
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

			console.log(user);
			console.log(account);
			if (user?.email_verified) {
				return true;
			} else {
				return false;
			}
		},
		jwt: async ({ token, trigger, account, profile, session, user }) => {
			// user && (token.user = user)
			if (user) {
				token.user = {
					...user,
					username: user.username,
					avatar: user.avatar,
					provider: account?.provider,
				};
			}
			if (trigger === "update" && session.user) {
				token.user = session.user;
			}

			return token;
		},
		session: async ({ session, token }) => {
			console.log(token);
			session.user = token.user;

			return session;
		},
	},
};
