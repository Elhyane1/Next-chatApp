import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import bcrypt from "bcrypt"

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Missing credentials");
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });

                if (!user) throw new Error("User not found");

                const isValid = await bcrypt.compare(
                    credentials.password,
                    user.password
                );

                if (!isValid) throw new Error("Invalid password");

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                };
            },
        }),
    ],

    session: {
        strategy: "jwt",
    },

    pages: {
        signIn: "/login",
    },

    secret: process.env.NEXTAUTH_SECRET,
}