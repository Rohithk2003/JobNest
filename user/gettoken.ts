import {
	getVerificationToken,
	getVerificationTokenByEmail,
} from "@/Database/database";
import { Database, Tables } from "@/types/supabase";
import { createClient } from "@/utils/supabase/client";

export const doesVerificationTokenExist = async (
	email: string
): Promise<Database["next_auth"]["Tables"]["VerificationToken"]["Row"]> => {
	const supabase = createClient();
	const data = await getVerificationTokenByEmail(email);

	return data;
};
