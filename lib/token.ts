import { doesVerificationTokenExist } from "@/user/gettoken";
import { createClient } from "@/utils/supabase/client";
import { v4 as uuidv4 } from "uuid";
export const getVerificationToken = async (email: string) => {
	const token = uuidv4();
	const supabase = createClient();
	const expires = new Date().getTime() + 1000 * 60 * 60 * 24; // 24 hours

	// check if a token already exists for the user
	const exisingToken = await doesVerificationTokenExist(email);
	if (exisingToken) {
		await supabase
			.schema("next_auth")
			.from("VerificationToken")
			.delete()
			.eq("id", exisingToken.id);
	}
	// generating new verification token
	const VerificationToken = await supabase
		.schema("next_auth")
		.from("VerificationToken")
		.insert([
			{
				email,
				token,
				expires: new Date(expires),
			},
		]);
	return VerificationToken;
};
