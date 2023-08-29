// "use client";

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

export const metadata: Metadata = {
	title: "Sign up - Spotify Clone",
};

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
			<form className="mt-5">
				<div className="space-y-6 w-[420px]">
					<div>
						<label
							htmlFor="email"
							className="block font-bold mb-1.5 text-sm"
						>
							What&apos;s your email?
						</label>
						<input
							type="text"
							placeholder="Enter your email."
							className="block w-full appearance-none px-3 py-2 border border-gray-500 bg-white rounded-sm focus:outline-none focus:border-black focus:border-2"
						/>
					</div>

					<div>
						<label
							htmlFor="email"
							className="block font-bold mb-1.5 text-sm"
						>
							Create a password
						</label>
						<input
							type="password"
							placeholder="Create a password."
							className="block w-full appearance-none px-3 py-2 border border-gray-500 bg-white rounded-sm focus:outline-none focus:border-black focus:border-2"
						/>
					</div>
					<div>
						<label
							htmlFor="email"
							className="block font-bold mb-1.5 text-sm"
						>
							What should we call you?
						</label>
						<input
							type="text"
							placeholder="Enter a profile name."
							className="block w-full appearance-none px-3 py-2 border border-gray-500 bg-white rounded-sm focus:outline-none focus:border-black focus:border-2"
						/>
						<p className="text-sm mt-2">
							This appears on your profile.
						</p>
					</div>
					<div className="flex justify-between">
						<div>
							<label
								htmlFor="email"
								className="block font-bold mb-1.5 text-sm"
							>
								Day
							</label>
							<input
								type="text"
								placeholder="DD"
								className="block appearance-none px-3 py-2 border border-gray-500 bg-white rounded-sm focus:outline-none focus:border-black focus:border-1 w-[100px]"
							/>
						</div>
						<div>
							<label
								htmlFor="email"
								className="block font-bold mb-1.5 text-sm"
							>
								Month
							</label>
							<select className="block  px-3 py-[9.5px] border border-gray-500 focus:outline-none focus:border-1  bg-white w-[200px]">
								<option value="" disabled>
									Month
								</option>
								<option value="january">January</option>
								<option value="february">February</option>
								<option value="march">March</option>
								<option value="april">April</option>
								<option value="may">May</option>
								<option value="june">June</option>
								<option value="july">July</option>
								<option value="august">August</option>
								<option value="september">September</option>
								<option value="october">October</option>
								<option value="november">November</option>
								<option value="december">December</option>
							</select>
						</div>
						<div>
							<label
								htmlFor="email"
								className="block font-bold mb-1.5 text-sm"
							>
								Year
							</label>
							<input
								type="text"
								placeholder="YYYY"
								className="block appearance-none px-3 py-2 border border-gray-500 bg-white rounded-sm focus:outline-none focus:border-black focus:border-1  w-[100px] "
							/>
						</div>
					</div>
					<div>
						<label className="block font-bold mb-2 text-sm">
							What&apos;s your gender?
						</label>
						<div className="flex gap-x-5 gap-y-3 flex-wrap">
							<div className="flex gap-x-1 items-center">
								<input
									id="genre-option-1"
									type="radio"
									name="genres"
									value="male"
									className="w-4 h-4"
									defaultChecked
								/>
								<label
									htmlFor="genre-option-1"
									className="block ml-2 text-sm font-medium"
								>
									Male
								</label>
							</div>
							<div className="flex gap-x-1 items-center">
								<input
									id="genre-option-2"
									type="radio"
									name="genres"
									value="female"
									className="w-4 h-4"
								/>
								<label
									htmlFor="genre-option-2"
									className="block ml-2 text-sm font-medium"
								>
									Female
								</label>
							</div>
							<div className="flex gap-x-1 items-center">
								<input
									id="genre-option-3"
									type="radio"
									name="genres"
									value="non-binary"
									className="w-4 h-4"
								/>
								<label
									htmlFor="genre-option-3"
									className="block ml-2 text-sm font-medium"
								>
									Non-binary
								</label>
							</div>
							<div className="flex gap-x-1 items-center">
								<input
									id="genre-option-4"
									type="radio"
									name="genres"
									value="other"
									className="w-4 h-4"
								/>
								<label
									htmlFor="genre-option-4"
									className="block ml-2 text-sm font-medium"
								>
									Other
								</label>
							</div>
							<div className="flex gap-x-1 items-center">
								<input
									id="genre-option-5"
									type="radio"
									name="genres"
									value="prefer-not-to-say"
									className="w-4 h-4"
								/>
								<label
									htmlFor="genre-option-5"
									className="block ml-2 text-sm font-medium"
								>
									Prefer not to say
								</label>
							</div>
						</div>
					</div>
					<div className="flex mb-4 pt-5">
						<input
							id="checkbox-1"
							type="checkbox"
							value=""
							className="rounded"
						/>
						<label
							htmlFor="checkbox-1"
							className="ml-3 text-sm font-medium"
						>
							Please send me news and offers from Spotify
						</label>
					</div>
					<div className="flex items-start mb-4">
						<input
							id="checkbox-2"
							type="checkbox"
							value=""
							className="rounded"
						/>
						<label
							htmlFor="checkbox-2"
							className="ml-3 -mt-1 text-sm font-medium"
						>
							Share my registration data with Spotify&apos;s
							content providers for marketing purposes. Note that
							your data may be transferred to a country outside of
							the EEA as described in our privacy policy.
						</label>
					</div>
					<div className="flex items-start mb-4">
						<input
							id="checkbox-3"
							type="checkbox"
							value=""
							className="rounded"
						/>
						<label
							htmlFor="checkbox-3"
							className="ml-3 -mt-1 text-sm font-medium"
						>
							I hereby agree to the{" "}
							<Link
								className="text-[#159B45] underline hover:text-[#1BE063]"
								href="#"
							>
								Terms of Service
							</Link>{" "}
							and consent to the collection, processing and use of
							my personal data, as described in more detail in the{" "}
							<Link
								href="#"
								className="text-[#159B45] underline hover:text-[#1BE063]"
							>
								Privacy Statement
							</Link>
							.
						</label>
					</div>
				</div>
				<div className="flex justify-center">
					<button className=" bg-[#1BE063] px-12 py-4 rounded-full text-black font-bold mt-8 hover:scale-105">
						Sign up
					</button>
				</div>
				<div className="flex justify-center mt-5">
					<p>
						Have an account?{" "}
						<Link
							className="text-[#159B45] underline hover:text-[#1BE063]"
							href="/login"
						>
							Log in
						</Link>
						.
					</p>
				</div>
			</form>
		</div>
	);
};

export default Signup;
