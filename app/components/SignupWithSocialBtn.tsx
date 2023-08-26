import Image, { StaticImageData } from "next/image";
import React from "react";

type SignupBtn = {
	logo: StaticImageData;
	name: string;
	btnBgColor?: string;
	btnTxtColor?: string;
};

const SignupWithSocialBtn = ({
	logo,
	name,
	btnBgColor,
	btnTxtColor,
}: SignupBtn) => {
	return (
		<div
			className="flex justify-center gap-x-5 items-center border border-solid border-[#767676] w-[400px] py-3 mb-3 rounded-full cursor-pointer hover:scale-105"
			style={{ backgroundColor: btnBgColor, color: btnTxtColor }}
		>
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

			<span className="font-bold">Sign up with {name}</span>
		</div>
	);
};

export default SignupWithSocialBtn;
