import { tables } from "@/configs/constants";
import { tableTypes } from "@/types/custom";
import { Database } from "@/types/supabase";
import { createClient } from "@/utils/supabase/client";
import { PostgrestError } from "@supabase/supabase-js";

const supabase = createClient();
export const getProviderUserByEmail = async (email: string) => {
	const { data, error } = await supabase
		.schema("next_auth")
		.from(tables.supabaseUsers)
		.select("*")
		.eq("email", email)
		.single();
	return { data, error } as {
		data: tableTypes["supabaseUser"];
		error: PostgrestError | null;
	};
};
export const getCredentialUserByEmail = async (email: string) => {
	const { data, error } = await supabase
		.schema("next_auth")
		.from(tables.credentials)
		.select("*")
		.eq("email", email)
		.single();
	return { data, error } as {
		data: tableTypes["credentials"];
		error: PostgrestError | null;
	};
};
export const getCredentialUserByUsername = async (username: string) => {
	const { data, error } = await supabase
		.schema("next_auth")
		.from(tables.credentials)
		.select("*")
		.eq("username", username)
		.single();

	return { data, error } as {
		data: tableTypes["credentials"];
		error: PostgrestError | null;
	};
};
export const createCredentialUser = async (
	user: Database["next_auth"]["Tables"]["credentials"]["Row"]
) => {
	const { data, error } = await supabase
		.schema("next_auth")
		.from(tables.supabaseUsers)
		.insert(user);
	if (error)
		return {
			message: error.message,
		};
	return {
		message: "Success",
	};
};

export const getVerificationToken = async (token: string) => {
	const { data, error } = await supabase
		.schema("next_auth")
		.from(tables.verificationTokens)
		.select("*")
		.eq("token", token)
		.single();
	if (error) {
		throw error;
	}
	return data as tableTypes["verificationTokens"];
};
export const getVerificationTokenByEmail = async (email: string) => {
	const { data, error } = await supabase
		.schema("next_auth")
		.from(tables.verificationTokens)
		.select("*")
		.eq("email", email)
		.limit(1)
		.maybeSingle();
	if (error) {
		throw error;
	}
	return data as tableTypes["verificationTokens"];
};
export const createVerificationToken = async (
	email: string,
	token: string,
	expires: number
) => {
	const { data, error } = await supabase
		.schema("next_auth")
		.from(tables.verificationTokens)
		.insert([{ email: email, token: token, expires: new Date(expires) }]);
	if (error) {
		return {
			message: error.message,
		};
	}
	return {
		message: "Success",
	};
};
