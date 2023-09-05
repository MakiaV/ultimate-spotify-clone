import Image, { StaticImageData } from "next/image";
import React from "react";
import { signIn } from "next-auth/react";

type LoginBtn = {
	logo: StaticImageData;
	name: string;
};

const LoginWithSocialBtn = ({ logo, name }: LoginBtn) => {
	const socialName = name.toLowerCase();
	return (
		<div
			onClick={() => signIn(`${socialName}`)}
			className="border border-solid border-[#767676] w-[330px] pl-8 py-2.5 mb-2 rounded-full hover:border-white cursor-default"
		>
			<div className="flex justify-between items-center w-[215px]">
				<div className="w-5">
					<Image
						src={logo}
						alt={`${name} logo`}
						style={{
							width: "100%",
							height: "auto",
						}}
					/>
				</div>

				<span className="font-bold">Continue with {name}</span>
			</div>
		</div>
	);
};

export default LoginWithSocialBtn;
