"use server";

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
		const tokenData: Database["next_auth"]["Tables"]["VerificationToken"]["Row"] =
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
			.from("credentials")
			.select("*")
			.eq("email", tokenData.email);
		if (!user || user.error) {
			return {
				error: "User not found",
			};
		} else {
			const currentUser: Database["next_auth"]["Tables"]["credentials"]["Row"] =
				user.data && user.data[0];
			if (!currentUser) {
				return {
					error: "User not found",
				};
			} else {
				if (currentUser.email_verified) {
					return {
						error: "Email already verified",
					};
				} else {
					const updatedUser = await supabase
						.schema("next_auth")
						.from("credentials")
						.update({ email_verified: true })
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
