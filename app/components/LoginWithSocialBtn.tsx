import Image, { StaticImageData } from "next/image";
import React from "react";

const LoginWithSocialBtn = ({
	logo,
	name,
}: {
	logo: StaticImageData;
	name: string;
}) => {
	return (
		<div className="border border-solid border-[#767676] w-[330px] pl-8 py-2.5 mb-2 rounded-full hover:border-white cursor-default ">
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
