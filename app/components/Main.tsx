"use client";

import Sidebar from "./Sidebar";

interface MainProps {
	children: React.ReactNode;
}

const Main = ({ children }: MainProps) => {
	return (
		<div className="flex h-[calc(100vh-80px)]">
			<Sidebar />
			<main className="flex-1 p-2 bg-black">{children}</main>
		</div>
	);
};

export default Main;
