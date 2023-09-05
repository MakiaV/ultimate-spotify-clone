import { connectMongoDB } from "@/lib/mongodb";
import User from "@/model/User";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import GithubProvider from "next-auth/providers/github";

import bcrypt from "bcryptjs";

export const authOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
		FacebookProvider({
			clientId: process.env.FACEBOOK_CLIENT_ID,
			clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
		}),
		GithubProvider({
			clientId: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET,
		}),
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},

			async authorize(credentials) {
				const { email, password } = credentials;

				try {
					await connectMongoDB();

					const user = await User.findOne({ email });

					if (!user) {
						return null;
					}

					const passwordsMatch = await bcrypt.compare(
						password,
						user.password
					);

					if (!passwordsMatch) {
						return null;
					}

					// console.log("user", user);

					return user;
				} catch (error) {
					console.log("Error: ", error);
				}
			},
		}),
	],
	callbacks: {
		async signIn({ user, account }) {
			if (account.provider === "google" || "facebook" || "github") {
				const { name, email } = user;
				try {
					await connectMongoDB();
					const userExists = await User.findOne({ email });

					if (!userExists) {
						const res = await fetch(
							"http://localhost:3000/api/user",
							{
								method: "POST",
								headers: {
									"Content-Type": "application/json",
								},
								body: JSON.stringify({
									name,
									email,
								}),
							}
						);

						if (res.ok) {
							return user;
						}
					}
				} catch (error) {
					console.log(error);
				}
			}

			return user;
		},
	},
	session: {
		strategy: "jwt",
	},
	secret: process.env.NEXTAUTH_SECRET,
	pages: {
		signIn: "/login",
	},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
