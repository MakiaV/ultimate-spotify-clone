import React from "react";
import { MdOutlineClose, MdPause, MdPlayArrow } from "react-icons/md";
import { MdMoreHoriz } from "react-icons/md";
import { IoMdHeart } from "react-icons/io";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import {
	selectSongFromPlaylist,
	selectedPlaylist,
} from "@/redux/features/playerSlice";
import Svg from "./Svg";

type itemProps = {
	song: Song;
	index: number;
	dataProps: any;
};

const Track = ({ song, index, dataProps }: itemProps) => {
	const reactAudioPlayer: any = useRef(null);
	const [duration, setDuration] = useState("0");
	const [found, setFound] = useState(false);

	const user: boolean = false;
	const dataPlaylists: any = [{}];
	const userID = "";

	const store: any = useSelector((state) => state);
	console.log("store", store);

	const selectedPlaylist =
		dataProps.album || dataProps.playlist || dataProps.user || dataProps;

	console.log("selectedPlaylist", selectedPlaylist);
	const getTime = (time: any) =>
		`${Math.floor(time / 60)}:${`0${Math.floor(time % 60)}`.slice(-2)}`;
	const onLoadedData = (event: any) =>
		setDuration(getTime(event.target.duration));

	const uPlaylists = dataProps.album.songs.filter(
		(playlist: any) =>
			playlist.playlistOwner?.id === userID &&
			playlist.isUserPlaylist === true
	);
	const dispatch = useDispatch();
	return (
		<div className="border border-green-500 px-4 py-2 flex justify-between">
			<div>
				<span>
					{JSON.stringify(store.player.playlistSongs) ===
						JSON.stringify(
							selectedPlaylist.songs.map(
								(song: Song) => song.songSrc
							)
						) &&
					store.player.playlistIsPlaying &&
					store.player.currentSongIndex === index ? (
						<MdPause
							size={25}
							style={{ cursor: "pointer" }}
							className=""
							onClick={() => {
								dispatch(
									selectSongFromPlaylist({
										selectedPlaylist,
										index,
									})
								);
							}}
						/>
					) : (
						<MdPlayArrow
							size={25}
							style={{ cursor: "pointer" }}
							className=""
							onClick={() => {
								// reactAudioPlayer.current.currentTime = 0;
								// setDuration("0");
								dispatch(
									selectSongFromPlaylist({
										selectedPlaylist,
										index,
									})
								);
							}}
						/>
					)}
				</span>
				<span
					className=""
					style={
						JSON.stringify(store.player.playlistSongs) ===
							JSON.stringify(
								selectedPlaylist.songs.map(
									(song: Song) => song.songSrc
								)
							) &&
						store.player.playlistIsPlaying &&
						store.player.currentSongIndex === index
							? {
									display: "none",
							  }
							: JSON.stringify(store.player.playlistSongs) ===
									JSON.stringify(
										selectedPlaylist.songs.map(
											(song: Song) => song.songSrc
										)
									) && store.player.currentSongIndex === index
							? {
									color: "skyblue",
							  }
							: {}
					}
				>
					{index + 1}
				</span>
				<span className="">
					{JSON.stringify(store.player.playlistSongs) ===
						JSON.stringify(
							selectedPlaylist.songs.map(
								(song: Song) => song.songSrc
							)
						) &&
						store.player.playlistIsPlaying &&
						store.player.currentSongIndex === index && <Svg />}
				</span>
				{dataProps.playlist && (
					<span className="">
						<Image
							src={song.songAlbum!.albumArtwork}
							alt="artwork"
							width={50}
							height={50}
							style={{ borderRadius: "5px" }}
						/>
					</span>
				)}
				{dataProps.songs && (
					<span className="">
						<Image
							src={song.songAlbum!.albumArtwork}
							alt="artwork"
							width={50}
							height={50}
							style={{ borderRadius: "5px" }}
						/>
					</span>
				)}
				<span
					className=""
					style={
						JSON.stringify(store.player.playlistSongs) ===
							JSON.stringify(
								selectedPlaylist.songs.map(
									(song: Song) => song.songSrc
								)
							) && store.player.currentSongIndex === index
							? {
									color: "skyblue",
							  }
							: {}
					}
				>
					<Link href={`/track/${song.id}`}>{song.songTitle}</Link>
				</span>
				<div className="">
					{song.songArtist.map((artist: Artist, index: number) => (
						<Link href={`/artist/${artist.id}`} key={index}>
							<span key={index}>
								<span className="">{artist.artistName}</span>

								{index < song.songArtist.length - 1 && (
									<span
										style={{
											marginRight: "5px",
										}}
									>
										,
									</span>
								)}
							</span>
						</Link>
					))}
				</div>
			</div>

			{user ? (
				<div className="">
					{dataProps?.playlist?.isUserPlaylist ? (
						<div className="">
							<span data-bs-toggle="dropdown">
								<span>
									<MdMoreHoriz
										size={25}
										style={{ cursor: "pointer" }}
									/>
								</span>
							</span>

							<ul
								className="dropdown-menu"
								style={{ background: "#242528" }}
							>
								<li className="">
									<span
										className=""
										// onClick={handelRemoveSongFromPlaylist}
									>
										Remove from this playlist
									</span>
								</li>
								{uPlaylists?.map((playlist: any) => (
									<li
										key={playlist.id}
										// onClick={() =>
										// 	handelAddSongToPlaylist(playlist.id)
										// }
										className=""
									>
										<span className="">
											{playlist.playlistName}
										</span>
									</li>
								))}
							</ul>
						</div>
					) : (
						<div className="btn-group dropstart">
							<span data-bs-toggle="dropdown">
								<span>
									<MdMoreHoriz
										size={25}
										style={{ cursor: "pointer" }}
									/>
								</span>
							</span>

							<ul
								className="dropdown-menu"
								style={{ background: "#242528" }}
							>
								<li className="">
									<span className="dropdown-item">
										<Link href="/collection/my-playlists">
											Create new Playlist
										</Link>
									</span>
								</li>
								{uPlaylists?.map((playlist: any) => (
									<li
										key={playlist.id}
										// onClick={() =>
										// 	handelAddSongToPlaylist(playlist.id)
										// }
										className=""
									>
										<span className="dropdown-item">
											{playlist.playlistName}
										</span>
									</li>
								))}
							</ul>
						</div>
					)}

					{found ? (
						<span>
							<IoMdHeart
								size={20}
								color="skyblue"
								// onClick={() => handelRemoveSongLiked()}
								style={{ cursor: "pointer" }}
							/>
						</span>
					) : (
						<span>
							<IoMdHeart
								size={20}
								// onClick={() => handelAddSongLiked()}
								style={{ cursor: "pointer" }}
							/>
						</span>
					)}
					<div className="">
						<span>{duration && duration}</span>
					</div>
				</div>
			) : (
				<div className="">
					<span>
						<MdMoreHoriz size={25} style={{ cursor: "pointer" }} />
					</span>

					<div className="">
						<span>You&rsquo;re logged out</span>
						<span style={{ fontSize: "20px" }}>
							Get the full experience
						</span>
						<Link href="/login">
							<span className="">Login | Sign up</span>
						</Link>
					</div>

					<MdOutlineClose size={30} />

					<span>
						<IoMdHeart size={20} style={{ cursor: "pointer" }} />
					</span>

					<div className="">
						<span>You&rsquo;re logged out</span>
						<span style={{ fontSize: "20px" }}>
							Get the full experience
						</span>
						<Link href="/login">
							<span className="">Login | Sign up</span>
						</Link>
					</div>

					<MdOutlineClose size={30} />

					<div className="">
						<span>{duration && duration}</span>
					</div>
				</div>
			)}
			<audio
				src={song.songSrc}
				ref={reactAudioPlayer}
				onLoadedData={onLoadedData}
			/>
		</div>
	);
};

export default Track;
