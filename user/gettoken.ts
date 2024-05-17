import { Database, Tables } from "@/types/supabase";
import { createClient } from "@/utils/supabase/client";

export const doesVerificationTokenExist = async (
	email: string
): Promise<Database["next_auth"]["Tables"]["VerificationToken"]["Row"]> => {
	const supabase = createClient();
	const { data } = await supabase
		.schema("next_auth")
		.from("VerificationToken")
		.select("*")
		.eq("email", email)
		.single();

	return data;
};
