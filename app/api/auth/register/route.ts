import { createClient } from "@/utils/supabase/client";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { cookies } from "next/headers";
import { tables } from "@/configs/constants";

export async function POST(request: Request) {
	const { email, password, username, confirmPassword } = await request.json();
	const supabase = createClient();
	const cookieStore = cookies();
	const csrf = cookieStore.get("next-auth.csrf-token");
	if (!csrf) {
		if (!email || !password) {
			return NextResponse.json({ message: "Email and password are required" });
		}
		if (password !== confirmPassword) {
			return NextResponse.json({ message: "Password does not match" });
		}
		const hashedPassword = await hash(password, 10);
		try {
			let { data: user, error } = await supabase
				.schema("next_auth")
				.from(tables.supabaseUsers)
				.insert([
					{
						email: email,
						password: hashedPassword,
						username: username,
					},
				]);
			if (error) {
				return NextResponse.json({ message: "User already exists" });
			} else {
				return NextResponse.json({ message: "Success" });
			}
		} catch (e) {
			return NextResponse.json({ message: "Could not reach servers" });
		}
	} else {
		return NextResponse.json({ message: "Invalid CSRF token" });
	}
}
