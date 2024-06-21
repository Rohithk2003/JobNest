"use server";

import VerificationEmail from "@/components/EmailTemplate/VerificationEmail";
import {Resend} from "resend";
import ChangePasswordEmail from "@/components/EmailTemplate/ChangePassword";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);
const domain = "http://localhost:3000";

export const sendVerificationMail = async (email: string, token: string) => {
    const confirmationlink = `${domain}/verify-email?token=${token}`;
    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Verify your email",
        text: "",
        react: VerificationEmail({verificationLink: confirmationlink}),
    });
};
export const sendPasswordResetMail = async (email: string, token: string) => {
    const confirmationlink = `${domain}/change-password?token=${token}&reset=false`;
    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Reset Password",
        text: "",
        react: ChangePasswordEmail({resetLink: confirmationlink}),
    });
};
export const sendPasswordWithCPasswordResetMail = async (
    email: string,
    token: string
) => {
    const confirmationlink = `${domain}/change-password?token=${token}&reset=true`;
    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Reset Password",
        react: ChangePasswordEmail({resetLink: confirmationlink}),
        text: "",
    });
};
