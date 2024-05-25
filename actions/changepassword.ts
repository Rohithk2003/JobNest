"use server";
import { hash, compareSync } from "bcrypt";
import { tables } from "@/configs/constants";
import { tableTypes } from "@/types/custom";
import { Database } from "@/types/supabase";
import { doesVerificationTokenExist } from "@/user/gettoken";
import { createClient } from "@/utils/supabase/client";
import { getUserByEmail } from "@/Database/database";
export default async function HandleChangePassword({
	currentPassword,
	newPassword,
	confirmPassword,
	PasswordAlreadySet,
	email,
}: {
	currentPassword: string;
	newPassword: string;
	confirmPassword: string;
	PasswordAlreadySet: boolean;
	email: string;
}) {
	if (!PasswordAlreadySet) {
		if (newPassword !== confirmPassword) {
			return {
				error: "Passwords do not match",
			};
		}
		const hashedPassword = await hash(newPassword, 10);
		const supabase = createClient();

		const { data, error } = await supabase
			.schema("next_auth")
			.from(tables.supabaseUsers)
			.update({ password: hashedPassword })
			.eq("email", email);
		if (error) {
			return {
				error: error.message,
			};
		}
		return {
			success: true,
		};
	} else {
		if (!currentPassword || !newPassword || !confirmPassword) {
			return {
				error: "Please fill in all fields",
			};
		}
		const { data: user, error } = await getUserByEmail(email);
		if (error) {
			return {
				error: "Network Error",
			};
		}
		if (!user) {
			return {
				error: "Network Error",
			};
		}
		const passwordsMatch = await compareSync(currentPassword, currentPassword);
		if (!passwordsMatch) {
			return {
				error: "Current password is incorrect",
			};
		}
		if (newPassword !== confirmPassword) {
			return {
				error: "Passwords do not match",
			};
		}
		const hashedPassword = hash(newPassword, 10);
		const supabase = createClient();
		const { data, error: er } = await supabase
			.schema("next_auth")
			.from(tables.supabaseUsers)
			.update({ password: hashedPassword });
		if (er) {
			return {
				error: "An unexpected error occurred. Please try again.",
			};
		}
		return {
			success: true,
		};
	}
}
