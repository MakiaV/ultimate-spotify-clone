// import { connectMongoDB } from "@/lib/mongodb";
// import User from "@/models/user";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/model/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

const validateEmail = (email: string): boolean => {
	const regEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
	return regEx.test(email);
};
const validateName = (username: string): boolean => {
	const regEx = /^[a-zA-Z0-9_.\-/\s/g]+$/;
	return regEx.test(username);
};
const validateForm = async (
	username: string,
	email: string,
	password: string
) => {
	let usernameError = "";
	let emailError = "";
	let passwordError = "";
	if (username.length < 3) {
		usernameError = "Username must have 3 or more characters";
	}
	if (username.length > 20) {
		usernameError = "Username name must be less than 20 characters";
	}
	if (!validateEmail(email)) {
		emailError =
			"This email is invalid. Make sure it's written like example@email.com";
	}
	if (!validateName(username)) {
		usernameError = "Username is invalid";
	}

	await connectMongoDB();
	const emailUser = await User.findOne({ email: email });

	const userName = await User.findOne({ name: username });

	if (emailUser) {
		emailError = "This email is already connected to an account.";
		// { error: "Email already exists" };
	}
	if (userName) {
		usernameError = "Username already exists";
	}

	if (password.length < 5) {
		passwordError = "Password must have 8 or more characters";
	}

	if (usernameError || emailError || passwordError) {
		console.log("error", { usernameError, emailError, passwordError });

		return { error: { usernameError, emailError, passwordError } };
	}

	return null;
	// return { data: { usernameError, emailError, passwordError } };
};

export async function POST(req: any) {
	try {
		const {
			name,
			email,
			password,
			birth: { day, month, year },
			gender,
		} = await req.json();
		const errorMessage = await validateForm(name, email, password);

		console.log("errorMessage", errorMessage);

		if (errorMessage) {
			return NextResponse.json(errorMessage);
		}
		const hashedPassword = await bcrypt.hash(password, 10);
		await connectMongoDB();
		await User.create({
			name,
			email,
			password: hashedPassword,
			gender,
			birth: { day, month, year },
		});

		return NextResponse.json(
			{ message: "User registered." },
			{ status: 201 }
		);
	} catch (error) {
		return NextResponse.json(
			{ message: "An error occurred while registering the user." },
			{ status: 500 }
		);
	}
}
