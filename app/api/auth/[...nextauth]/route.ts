import { connectMongoDB } from "@/lib/mongodb";
import User from "@/model/User";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions: any = {
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},

			async authorize(credentials) {
				const { email, password } = credentials!;

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
