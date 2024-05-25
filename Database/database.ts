import { tables } from "@/configs/constants";
import { tableTypes } from "@/types/custom";
import { Database } from "@/types/supabase";
import { createClient } from "@/utils/supabase/client";
import { PostgrestError } from "@supabase/supabase-js";
import { User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";

const supabase = createClient();
export const getUserByEmail = async (email: string) => {
	const { data, error } = await supabase
		.schema("next_auth")
		.from(tables.supabaseUsers)
		.select("*")
		.eq("email", email)
		.limit(1)
		.maybeSingle();
	return { data, error } as {
		data: tableTypes["supabaseUser"];
		error: PostgrestError | null;
	};
};
export const getUserByUsername = async (username: string) => {
	const { data, error } = await supabase
		.schema("next_auth")
		.from(tables.supabaseUsers)
		.select("*")
		.eq("username", username)
		.limit(1)
		.maybeSingle();
	return { data, error } as {
		data: tableTypes["supabaseUser"];
		error: PostgrestError | null;
	};
};

export const createUser = async (
	email: string,
	password: string,
	username: string
) => {
	const { data, error } = await supabase
		.schema("next_auth")
		.from(tables.supabaseUsers)
		.insert({
			email: email,
			password: password,
			username: username,
		});
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
		.limit(1)
		.maybeSingle();
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
