import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

const Sidebar = () => {
	const pathname = usePathname();

	const sidebarNavs = useMemo(
		() => [
			{
				icon: HiHome,
				label: "Home",
				active: pathname !== "/search",
				href: "/",
			},
			{
				icon: BiSearch,
				label: "Search",
				href: "/search",
				active: pathname === "/search",
			},
		],
		[pathname]
	);
	return (
		<div className="hidden md:flex flex-col gap-y-2 bg-black h-full w-[435px] py-2 pl-2">
			<div className="w-full bg-[#121212] rounded-lg h-fit">
				<div className="flex flex-col gap-y-4 px-5 py-4">
					{sidebarNavs.map((nav) => (
						<Link
							href={nav.href}
							key={nav.label}
							className={twMerge(
								`
							flex 
							flex-row 
							h-auto 
							items-center 
							w-full 
							gap-x-4 
							text-md 
							font-medium
							cursor-pointer
							hover:text-white
							transition
							text-neutral-400
							py-1`,
								nav.active && "text-white"
							)}
						>
							{<nav.icon size={26} />}
							<p className="truncate w-100">{nav.label}</p>
						</Link>
					))}
				</div>
			</div>
			<div className="w-full bg-[#121212] rounded-lg h-full overflow-y-auto">
				<div className="flex flex-col">
					<div className="flex items-center justify-between px-5 pt-4">
						<div className="inline-flex items-center gap-x-2">
							<TbPlaylist
								className="text-neutral-400"
								size={26}
							/>
							<p className="text-neutral-400 font-medium text-md">
								Your Library
							</p>
						</div>
						<AiOutlinePlus
							onClick={() => {}}
							size={20}
							className="text-neutral-400 cursor-pointer hover:text-white transition"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
