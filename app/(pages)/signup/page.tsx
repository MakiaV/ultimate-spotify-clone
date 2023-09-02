"use client";

import { useState } from "react";

import LoginWithSocialBtn from "@/app/components/LoginWithSocialBtn";
import Image from "next/image";
import Link from "next/link";
import spotifyLogo from "public/images/spotify-logo-black.png";
import googleLogo from "public/images/google-logo.png";
import facebookLogo from "public/images/facebook-logo-white.png";
import appleLogo from "public/images/apple-logo.png";
import githubLogo from "public/images/github-logo.png";
import SignupWithSocialBtn from "@/app/components/SignupWithSocialBtn";
import type { Metadata } from "next";
import RegisterForm from "@/app/components/RegisterForm";
import { useRouter } from "next/navigation";

const Signup = () => {
	return (
		<div
			style={{ colorScheme: "light" }}
			className="bg-white text-black min-h-screen flex flex-col items-center pb-20"
		>
			<div className="py-10">
				<Link href="/" className="cursor-default">
					<Image
						src={spotifyLogo}
						alt="Spotify logo"
						width={120}
						height={0}
					/>
				</Link>
			</div>
			<SignupWithSocialBtn
				logo={facebookLogo}
				name="Facebook"
				btnBgColor="#384F80"
				btnTxtColor="#FFF"
			/>
			<SignupWithSocialBtn logo={googleLogo} name="Google" />
			<SignupWithSocialBtn
				logo={appleLogo}
				name="Apple"
				btnBgColor="#53575e"
				btnTxtColor="#FFF"
			/>
			<SignupWithSocialBtn
				logo={githubLogo}
				name="Github"
				btnBgColor="#000"
				btnTxtColor="#FFF"
			/>
			<div className="flex justify-center items-center gap-x-5 my-3">
				<div className="w-[165px] border border-b-0 border-[#CCCCCC]"></div>
				<div className="text-[#838383] mb-1">or</div>
				<div className="w-[165px] border border-b-0 border-[#CCCCCC]"></div>
			</div>
			<p className="font-bold text-lg">Sign up with your email address</p>
			<RegisterForm />
		</div>
	);
};

export default Signup;
