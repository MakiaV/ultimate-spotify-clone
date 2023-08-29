import { updatePlaylist } from "@/redux/features/playerSlice";
import { FaPlay } from "react-icons/fa";

const PlayBtn = ({ store, dispatch, album }: any) => {
	return (
		<button
			onClick={(e) => {
				e.stopPropagation();
				dispatch(
					updatePlaylist({
						playlist: album,
						currentSongIndex: store.player.currentSongIndex,
					})
				);
			}}
			className="
      transition 
      opacity-0 
      rounded-full 
      flex 
      items-center 
      justify-center 
      bg-green-500 
      p-4 
      drop-shadow-md 
      translate
      translate-y-1/4
      group-hover:opacity-100 
      group-hover:translate-y-0
      hover:scale-110
    "
		>
			<FaPlay className="text-black" />
		</button>
	);
};

export default PlayBtn;
