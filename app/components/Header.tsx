"use client";

import { useRouter } from "next/navigation";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SlUser } from "react-icons/sl";
import { BsArrowDownCircle } from "react-icons/bs";

const Header = () => {
	const router = useRouter();
	const { data: session } = useSession();

	const src: any = session?.user?.image;

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
			{session?.user ? (
				<div className="flex items-center gap-x-4">
					<div
						className="flex items-center gap-x-1.5 bg-black px-3 py-1.5 rounded-3xl
					"
					>
						<BsArrowDownCircle color="#fff" />
						<span className="text-sm">Install App</span>
					</div>
					<div className="bg-black rounded-full w-8 h-8 flex justify-center items-center">
						<SlUser />
					</div>
				</div>
			) : (
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
					{/* <div className="shadow-lg p-8 bg-zince-300/10 flex flex-col gap-2 my-6">
					<div>
						Name:{" "}
						<span className="font-bold">{session?.user?.name}</span>
					</div>
					<div>
						Email:{" "}
						<span className="font-bold">
							{session?.user?.email}
						</span>
					</div>
					<Image
						src={src}
						className="rounded-full"
						width={60}
						height={60}
						alt="profile image"
					/>
					<button
						onClick={() => signOut()}
						className="bg-red-500 text-white font-bold px-6 py-2 mt-3"
					>
						Log Out
					</button>
				</div> */}
				</div>
			)}
		</div>
	);
};

export default Header;
