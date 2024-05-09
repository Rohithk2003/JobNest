"use client";
import CredentialsForm from "@/app/components/CredentialsForm";
import { getIconLocation, getRegisterRoute } from "@/configs/constants";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";

export default function Login() {
	return <CredentialsForm />;
}
