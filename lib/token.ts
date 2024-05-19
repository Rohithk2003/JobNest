import {
	createVerificationToken,
	getVerificationTokenByEmail,
} from "@/Database/database";
import { Database } from "@/types/supabase";
import { doesVerificationTokenExist } from "@/user/gettoken";
import { createClient } from "@/utils/supabase/client";
import { v4 as uuidv4 } from "uuid";
export const getVerificationToken = async (email: string) => {
	const token = uuidv4();
	const supabase = createClient();
	const expires = new Date().getTime() + 1000 * 60 * 60 * 24; // 24 hours

	const exisingToken = await getVerificationTokenByEmail(email);
	if (exisingToken) {
		await supabase
			.schema("next_auth")
			.from("VerificationToken")
			.delete()
			.eq("id", exisingToken.id);
	}
	const result: { message: string } = await createVerificationToken(
		email,
		token,
		expires
	);
	return token;
};
