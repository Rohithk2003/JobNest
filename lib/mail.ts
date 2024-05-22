"use server";

import VerificationEmail from "@/app/components/EmailTemplate/VerificationEmail";
import { Resend } from "resend";
import ReactDOMServer from "react-dom/server";
import ChangePasswordEmail from "@/app/components/EmailTemplate/ChangePassword";

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
export const sendPasswordResetMail = async (email: string, token: string) => {
	const confirmationlink = `${domain}/change-password?token=${token}`;
	await resend.emails.send({
		from: "onboarding@resend.dev",
		to: email,
		subject: "Reset Password",
		react: ChangePasswordEmail({ resetLink: confirmationlink }),
	});
};
