"use server";

import { tables } from "@/configs/constants";
import { tableTypes } from "@/types/custom";
import { Database } from "@/types/supabase";
import { doesVerificationTokenExist } from "@/user/gettoken";
import { createClient } from "@/utils/supabase/client";

const newVerification = async (token: string | null) => {
	const supabase = createClient();
	if (!token) {
		return {
			error: "no token provided",
		};
	}
	const exisingToken = await supabase
		.schema("next_auth")
		.from("VerificationToken")
		.select("*")
		.eq("token", token);
	if (exisingToken) {
		const tokenData: tableTypes["verificationTokens"] =
			exisingToken.data && exisingToken?.data[0];

		if (!tokenData)
			return {
				error: "Invalid Token",
			};

		const hasExpired = new Date(tokenData.expires) < new Date();
		if (hasExpired) {
			return {
				error: "Token has expired",
			};
		}
		const user = await supabase
			.schema("next_auth")
			.from(tables.supabaseUsers)
			.select("*")
			.eq("email", tokenData.email);
		if (!user || user.error) {
			return {
				error: "User not found",
			};
		} else {
			const currentUser: tableTypes["supabaseUser"] = user.data && user.data[0];
			if (!currentUser) {
				return {
					error: "User not found",
				};
			} else {
				if (currentUser.emailVerified) {
					return {
						error: "Email already verified",
					};
				} else {
					const updatedUser = await supabase
						.schema("next_auth")
						.from(tables.supabaseUsers)
						.update({ emailVerified: true })
						.eq("id", currentUser.id);
					if (updatedUser.error) {
						return {
							error: "Error verifying email",
						};
					} else {
						await supabase
							.schema("next_auth")
							.from("VerificationToken")
							.delete()
							.eq("id", tokenData.id);
						return {
							success: "Email verified",
						};
					}
				}
			}
		}
	} else {
		return {
			error: "Network error",
		};
	}
};
export default newVerification;
