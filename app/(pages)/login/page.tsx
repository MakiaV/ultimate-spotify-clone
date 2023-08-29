import Image from "next/image";
import spotifyLogo from "public/images/spotify-logo-white.png";
import googleLogo from "public/images/google-logo.png";
import facebookLogo from "public/images/facebook-logo.png";
import appleLogo from "public/images/apple-logo.png";
import githubLogo from "public/images/github-logo.png";
import LoginWithSocialBtn from "@/app/components/LoginWithSocialBtn";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Login - Spotify Clone",
};
const Login = () => {
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
					<h1 className="text-5xl font-bold mb-16">
						Log in to Spotify
					</h1>
					<LoginWithSocialBtn logo={googleLogo} name="Google" />
					<LoginWithSocialBtn logo={facebookLogo} name="Facebook" />
					<LoginWithSocialBtn logo={appleLogo} name="Apple" />
					<LoginWithSocialBtn logo={githubLogo} name="Github" />
					<div className="w-[500px] border border-b-0 border-[#292929] mt-8"></div>

					<form className="mt-8">
						<div className="space-y-4">
							<div>
								<label
									htmlFor="email"
									className="block font-bold mb-1.5 text-sm"
								>
									Email or username
								</label>
								<input
									type="text"
									id="email"
									placeholder="Email or username"
									className="block w-[315px] appearance-none px-3 py-2 border border-[#727272] rounded-sm focus:outline-none focus:border-white focus:border-2 bg-[#121212]"
								/>
							</div>
							<div>
								<label
									htmlFor="email"
									className="block font-bold mb-1.5 text-sm"
								>
									Password
								</label>
								<input
									type="password"
									id="password"
									placeholder="Password"
									className="block w-[315px] appearance-none px-3 py-2 border border-[#727272] rounded-sm focus:outline-none focus:border-white focus:border-2 bg-[#121212]"
								/>
							</div>
						</div>
						<div className="mt-5">
							<label className="relative inline-flex items-center">
								<input
									type="checkbox"
									value=""
									className="sr-only peer"
								/>
								<div className="w-[29px] h-4 bg-[#727272] outline outline-2 outline-black  peer-focus:ring-[5px] peer-focus:ring-white rounded-full peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[3px] after:bg-[#121212]  after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-[#1AD860]"></div>
								<span className="ml-3 text-sm font-bold">
									Remember me
								</span>
							</label>
						</div>

						<button className="w-full bg-[#1AD860] py-3 rounded-full text-black font-bold mt-8 hover:scale-105 cursor-default">
							Log In
						</button>
					</form>
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
