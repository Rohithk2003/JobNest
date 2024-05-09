// next-auth-extensions.d.ts
import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
    interface Session {
        user: {
            username: string | null;
        } & DefaultSession["user"]
    }
    interface User {
        name: string
        username: string
    }
}
declare module "@auth/core/adapters" {
    interface AdapterUser {
        username: string | null;
    };
}

declare module "next-auth/jwt" {
    interface JWT {
        user: {
            username: string | null;
        } & DefaultSession["user"]
    }
}

interface User {
    username: string | null;
}
