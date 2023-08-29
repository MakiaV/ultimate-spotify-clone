import Image from "next/image";
import React from "react";
import PlayBtn from "./PlayBtn";
import { useSelector, useDispatch } from "react-redux";
import { selectedPlaylist } from "@/redux/features/playerSlice";
import { updatePlaylist } from "@/redux/features/playerSlice";

const PlaylistCard = ({ album }: any) => {
	const dispatch = useDispatch();
	const store: any = useSelector((state) => state);

	console.log("store", store);

	return (
		<div
			onClick={() => dispatch(selectedPlaylist({ playlist: album }))}
			className="
      relative 
      group 
      flex 
      flex-col 
      items-center 
      justify-center 
      rounded-md 
      overflow-hidden 
      gap-x-4 
      bg-neutral-400/5 
      cursor-pointer 
      hover:bg-neutral-400/10 
      transition 
      p-3
    "
		>
			<div
				className="
        relative 
        aspect-square 
        w-full
        h-full 
        rounded-md 
        overflow-hidden
      "
			>
				<Image
					className="object-cover"
					src={album.albumArtwork}
					fill
					alt="Image"
				/>
			</div>
			<div className="flex flex-col items-start w-full pt-4 gap-y-1">
				<p className="font-semibold truncate w-full">
					{album.albumName}
				</p>
				<p
					className="
          text-neutral-400 
          text-sm 
          pb-4 
          w-full 
          truncate
        "
				>
					By {album.albumArtist[0].artistName}
				</p>
			</div>
			<div
				className="
        absolute 
        bottom-24 
        right-5
      "
			>
				<PlayBtn store={store} dispatch={dispatch} album={album} />
			</div>
		</div>
	);
};

export default PlaylistCard;
