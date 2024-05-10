// next-auth-extensions.d.ts
import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
    interface Session {
        user: {
            username: string | null;
            avatar: string | null;
        } & DefaultSession["user"]
    }
    interface User {
        name: string
        username: string
        avatar: string | null;

    }
}
declare module "@auth/core/adapters" {
    interface AdapterUser {
        username: string | null;
        avatar: string | null;

    };
}

declare module "next-auth/jwt" {
    interface JWT {
        user: {
            username: string | null;
            avatar: string | null;

        } & DefaultSession["user"]
    }
}

interface User {
    username: string | null;
    avatar: string | null;

}
