"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AiFillExclamationCircle } from "react-icons/ai";

const LoginForm = ({ setError }: { setError: any }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [emailError, setEmailError] = useState(false);
	const [passwordError, setPasswordError] = useState(false);

	const router = useRouter();

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		if (!email) {
			setEmailError(true);
		}
		if (!password) {
			setPasswordError(true);
		}

		try {
			const res: any = await signIn("credentials", {
				email,
				password,
				redirect: false,
			});

			if (res.error) {
				setError("Incorrect email or password");
				return;
			}

			router.replace("/");
		} catch (error) {
			setError(error);
			console.log(error);
		}
	};
	return (
		<form onSubmit={handleSubmit} className="mt-8">
			<div className="space-y-4">
				<div>
					<label
						htmlFor="email"
						className="block font-bold mb-1.5 text-sm"
					>
						Email address
					</label>
					<input
						onChange={(e) => setEmail(e.target.value)}
						type="text"
						id="email"
						placeholder="Email address"
						className={`block w-[315px] appearance-none px-3 py-2 border ${
							emailError
								? "border-red-500 focus:border-red-500"
								: "border-[#727272]"
						}  rounded-sm focus:outline-none focus:border-white focus:border-2 bg-[#121212]`}
					/>
					{emailError && (
						<span className="flex items-center mt-2 gap-x-1">
							<AiFillExclamationCircle
								size={15}
								color="#F25E6B"
							/>
							<span className="text-[#E91528] text-xs">
								Please enter your Spotify email address.
							</span>
						</span>
					)}
				</div>
				<div>
					<label
						htmlFor="password"
						className="block font-bold mb-1.5 text-sm"
					>
						Password
					</label>
					<input
						onChange={(e) => setPassword(e.target.value)}
						type="password"
						id="password"
						placeholder="Password"
						className={`block w-[315px] appearance-none px-3 py-2 border ${
							passwordError
								? "border-red-500 focus:border-red-500"
								: "border-[#727272]"
						}  rounded-sm focus:outline-none focus:border-white focus:border-2 bg-[#121212]`}
					/>
					{passwordError && (
						<span className="flex items-center mt-2 gap-x-1">
							<AiFillExclamationCircle
								size={15}
								color="#F25E6B"
							/>
							<span className="text-[#E91528] text-xs">
								Please enter your password.
							</span>
						</span>
					)}
				</div>
			</div>
			<div className="mt-5">
				<label className="relative inline-flex items-center">
					<input type="checkbox" value="" className="sr-only peer" />
					<div className="w-[29px] h-4 bg-[#727272] outline outline-2 outline-black  peer-focus:ring-[5px] peer-focus:ring-white rounded-full peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[3px] after:bg-[#121212]  after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-[#1AD860]"></div>
					<span className="ml-3 text-sm font-bold">Remember me</span>
				</label>
			</div>

			<button className="w-full bg-[#1AD860] py-3 rounded-full text-black font-bold mt-8 hover:scale-105 cursor-default">
				Log In
			</button>
			{/* {error && (
				<div className="bg-[#E91528] text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
					{error}
				</div>
			)} */}
		</form>
	);
};

export default LoginForm;
