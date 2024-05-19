"use server";

import VerificationEmail from "@/app/components/EmailTemplate";
import { Resend } from "resend";
import ReactDOMServer from "react-dom/server";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);
const domain = "http://localhost:3000";

export const sendVerificationMail = async (email: string, token: string) => {
	const confirmationlink = `${domain}/verify-email?token=${token}`;
	await resend.emails.send({
		from: "onboarding@resend.dev",
		to: email,
		subject: "Verify your email",
		react: VerificationEmail({ verificationLink: confirmationlink }),
	});
};
