// types/next-auth.d.ts (or just next-auth.d.ts in root)
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      role?: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    role?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user?: {
      role?: string;
      [key: string]: any;
    };
  }
}
