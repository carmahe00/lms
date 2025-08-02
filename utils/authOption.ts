import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "./dbConnect";
import User from '@/models/user';
import bcrypt from 'bcrypt';

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt"
    },
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({

            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            credentials: {
                email: { label: "Email", type: "text", placeholder: "input yout email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                await dbConnect();
                if (!credentials)
                    return null;
                const { email, password } = credentials;
                const user = await User.findOne({
                    email
                });

                if (!user.password)
                    throw new Error("Please login via method to sign up");
                const isPassword: boolean = user && (bcrypt.compareSync(password, user.password));
                if (!isPassword)
                    throw new Error("Invalid Email or password");

                return user;
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!
        })
    ],
    callbacks: {
        async signIn({ user }) {
            await dbConnect();
            const { email, name, image } = user;
            let dbUser = await User.findOne({ email });
            if (!dbUser)
                dbUser = await User.create({
                    email,
                    name,
                    image
                })

            return true;
        },
        jwt: async ({ token }) => {
            const userByEmail = await User.findOne({ email: token.email });
            if (userByEmail) {
                userByEmail.password = undefined;
                token.user = {
                    ...userByEmail.toObject(),
                    role: userByEmail.role || "user"
                }
            }
            return token;
        },
        session: async ({ token, session }) => {
            if (token.user)
                session.user = {
                    ...token.user,
                    role: token.user.role || "user"
                }

            return session
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login",

    }
}

export default NextAuth(authOptions)
