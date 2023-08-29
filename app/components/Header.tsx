"use client";

import { useRouter } from "next/navigation";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";

import React from "react";
import Link from "next/link";

const Header = () => {
	const router = useRouter();
	return (
		<div className="flex justify-between items-center px-4 py-2 bg-[#101010] fixed top-2 w-[calc(100%-450px)] rounded-tl-lg">
			<div className="hidden md:flex gap-x-2 items-center">
				<button
					onClick={() => router.back()}
					className="rounded-full bg-[#050505] flex items-center justify-center cursor-pointer hover:opacity-75 transition"
				>
					<RxCaretLeft className="text-white" size={35} />
				</button>
				<button
					onClick={() => router.back()}
					className="rounded-full bg-[#050505] flex items-center justify-center cursor-pointer hover:opacity-75 transition"
				>
					<RxCaretRight className="text-white" size={35} />
				</button>
			</div>
			<div className="flex items-center gap-x-6">
				<div className="flex gap-x-2 tracking-widest  font-bold">
					<Link
						className="text-neutral-400 hover:text-white "
						href="#"
					>
						Premium
					</Link>
					<Link
						className="text-neutral-400 hover:text-white"
						href="#"
					>
						Support
					</Link>
					<Link
						className="text-neutral-400 hover:text-white"
						href="#"
					>
						Download
					</Link>
				</div>
				<hr className="w-6 rotate-90"></hr>
				<Link
					href="/signup"
					className="text-neutral-400 hover:text-white font-bold"
				>
					Sign up
				</Link>
				<Link
					href="/login"
					className="font-bold bg-white text-black px-8 py-3 rounded-full hover:scale-105"
				>
					Login
				</Link>
			</div>
		</div>
	);
};

export default Header;
