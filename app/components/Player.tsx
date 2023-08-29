import Link from "next/link";
import React from "react";

const Player = () => {
	return (
		<div className="fixed bottom-0 px-2 w-full h-[80px] bg-black">
			<Link
				href="/signup"
				className="bg-gradient-to-r from-[#AD2796] to-[#519AF4] h-[90%]  p-2  px-4 flex justify-between items-center"
			>
				<div>
					<p className="text-sm">PREVIEW OF SPOTIFY</p>
					<p>
						Sign up to get unlimited songs and podcasts with
						occasional ads. No credit card needed.
					</p>
				</div>
				<button className="bg-white text-black px-8 py-3 mr-4 rounded-full font-bold">
					Sign up for free
				</button>
			</Link>
		</div>
	);
};

export default Player;
