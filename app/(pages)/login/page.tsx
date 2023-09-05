"use client";

import Image from "next/image";
import spotifyLogo from "public/images/spotify-logo-white.png";
import googleLogo from "public/images/google-logo.png";
import facebookLogo from "public/images/facebook-logo.png";
import appleLogo from "public/images/apple-logo.png";
import githubLogo from "public/images/github-logo.png";
import LoginWithSocialBtn from "@/app/components/LoginWithSocialBtn";
import Link from "next/link";
import type { Metadata } from "next";
import LoginForm from "@/app/components/LoginForm";
import { useEffect, useState } from "react";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

// export const metadata: Metadata = {
// 	title: "Login - Spotify Clone",
// };
const Login = () => {
	const [error, setError] = useState("");
	const { data: session } = useSession();

	if (session) redirect("/");

	return (
		<div>
			<div className="bg-black pl-[50.5px] py-8">
				<Link href="/" className="cursor-default">
					<Image
						src={spotifyLogo}
						alt="Spotify logo"
						width={118}
						height={118}
					/>
				</Link>
			</div>
			<div className="flex justify-center bg-gradient-to-b from-[#191919] to-black">
				<div className="w-[735px] rounded-lg mt-8 bg-black flex flex-col items-center py-20">
					<h1 className="text-5xl font-bold mb-12">
						Log in to Spotify
					</h1>

					{error && (
						<div className="bg-[#E91528] flex items-center gap-x-4 text-white w-[635px] text-bold  text-sm p-3  mb-5">
							<AiOutlineExclamationCircle size={25} />
							<span>{error}</span>
						</div>
					)}

					<LoginWithSocialBtn logo={googleLogo} name="Google" />
					<LoginWithSocialBtn logo={facebookLogo} name="Facebook" />
					<LoginWithSocialBtn logo={githubLogo} name="Github" />
					<div className="w-[500px] border border-b-0 border-[#292929] mt-8"></div>
					<LoginForm setError={setError} />

					<Link
						href="#"
						className="font-bold mt-7 underline decoration-solid hover:decoration-[#1AD860]"
					>
						Forgot your password?
					</Link>
					<div className="w-[500px] border border-b-0 border-[#292929] mt-8"></div>
					<div className="flex gap-2 mt-12">
						<p className="text-[#A7A7A7] font-semibold">
							Don&apos;t have an account?
						</p>
						<Link
							href="/signup"
							className="underline decoration-solid hover:decoration-[#1AD860] hover:text-[#1AD860]"
						>
							Sign up for Spotify
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
