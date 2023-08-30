"use client";

import Link from "next/link";
import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import {
	BsArrowRepeat,
	BsFillVolumeMuteFill,
	BsFillVolumeUpFill,
	BsVolumeDownFill,
} from "react-icons/bs";
import {
	MdOutlineClose,
	MdRepeat,
	MdRepeatOne,
	MdSkipPrevious,
} from "react-icons/md";
import { MdSkipNext } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import {
	playPause,
	nextSong,
	nextSongOnEnded,
	previousSong,
	repeatOne,
	shuffle,
} from "../../redux/features/playerSlice";
import { MdPlayArrow } from "react-icons/md";
import { MdPause } from "react-icons/md";
import { AiOutlineHeart } from "react-icons/ai";

import { gql, useMutation, useQuery } from "@apollo/client";

const Player = () => {
	const [isLogged, setIsLogged] = useState(true);
	const [duration, setDuration] = useState("0");
	const [seekTime, setSeekTime] = useState("0");
	const [appTime, setAppTime] = useState("0");
	const [volume, setVolume] = useState("0.5");
	const [progressBar, setProgressBar] = useState(0);
	const [volumeBarProgress, setVolumeBarProgress] = useState("50");

	const min = "0";
	const max = duration;

	const reactAudioPlayer: any = useRef(null);
	const dispatch = useDispatch();
	const store: any = useSelector((state) => state);

	// console.log("Store ds Player", store);

	const songID =
		store.player.playlist?.songs[store.player.currentSongIndex].id;

	const getTime = (time: any) =>
		`${Math.floor(time / 60)}:${`0${Math.floor(time % 60)}`.slice(-2)}`;

	const onInput = (event: any) => setSeekTime(event.target.value);

	const onTimeUpdate = (event: any) => {
		setAppTime(event.target.currentTime);
		const time = reactAudioPlayer.current.currentTime;
		// const index = syncLyric(myLyrics, time);
		// if (index == null) return;
		// const lyrics = myLyrics[index];
		// setMyText(lyrics);
	};
	const onLoadedData = (event: any) => setDuration(event.target.duration);

	const playSong = useCallback(() => {
		if (store.player.playlistSongs) {
			setTimeout(function () {
				reactAudioPlayer.current.play();
			}, 0);
		}
	}, [store.player.playlistSongs]);

	const pauseSong = useCallback(() => {
		store.player.playlistSongs && reactAudioPlayer.current.pause();
	}, [store.player.playlistSongs]);

	const updateIsPlaying = () => {
		dispatch(playPause({}));
	};
	function repeatOneSong() {
		dispatch(repeatOne({}));
	}
	const goNextSong = () => {
		// setMyText("");
		dispatch(nextSong({}));

		reactAudioPlayer.current.currentTime = 0;
		pauseSong();
		playSong();
	};

	const goNextSongOnEnded = () => {
		// updateSongPlaycount();
		// setMyText("");

		dispatch(nextSongOnEnded({}));

		reactAudioPlayer.current.currentTime = 0;
		pauseSong();
		playSong();
	};
	const goPreviousSong = () => {
		if (reactAudioPlayer.current.currentTime < 2) {
			// setMyText("");
			dispatch(previousSong({}));
			pauseSong();
			playSong();
		} else {
			// setMyText("");
			reactAudioPlayer.current.currentTime = 0;

			playSong();
		}
	};

	useEffect(() => {
		if (store.player.playlistIsPlaying) {
			// setProgressBar((parseInt(appTime) / parseInt(duration)) * 100);
			playSong();
		} else {
			pauseSong();
		}
	}, [playSong, pauseSong, store.player.playlistIsPlaying]);

	return (
		<>
			{store.player.playlistSongs ? (
				<div className="fixed bottom-0 px-4 w-full h-[80px] bg-black flex justify-between items-center">
					<div>
						<div className="flex items-center gap-x-4">
							<Image
								src={
									store.player.playlist?.songs[
										store.player.currentSongIndex
									].songAlbum.albumArtwork
								}
								alt="coverart"
								width={60}
								height={60}
								className="rounded-md"
							/>
							<div className="flex flex-col">
								<span className="text-lg">
									{
										store.player.playlist?.songs[
											store.player.currentSongIndex
										].songTitle
									}
								</span>
								<span className="text-xs text-neutral-500">
									{
										store.player.playlist?.songs[
											store.player.currentSongIndex
										].songArtist[0].artistName
									}
								</span>
							</div>
							<AiOutlineHeart size={22} />
						</div>

						<audio
							src={
								store.player.playlistSongs[
									store.player.currentSongIndex
								]
							}
							ref={reactAudioPlayer}
							onTimeUpdate={onTimeUpdate}
							onLoadedData={onLoadedData}
							onEnded={goNextSongOnEnded}
						/>
					</div>
					<div className="flex flex-col items-center">
						<div className="flex items-center gap-5">
							<MdSkipPrevious
								size={25}
								onClick={() => goPreviousSong()}
							/>
							{store.player.playlistIsPlaying ? (
								<MdPause
									size={30}
									onClick={() => updateIsPlaying()}
								/>
							) : (
								<MdPlayArrow
									size={30}
									onClick={() => updateIsPlaying()}
								/>
							)}
							<MdSkipNext
								size={25}
								onClick={() => goNextSong()}
							/>
						</div>
						<div className="flex items-center gap-x-5">
							<span className="">
								{appTime === "0" ? "0:00" : getTime(appTime)}
							</span>
							<div className="w-[300px]">
								<input
									type="range"
									step="any"
									value={appTime}
									min={min}
									max={max}
									onInput={onInput}
									className="w-full"
								/>
								<div
									className=""
									style={{
										width: progressBar + "%",
									}}
								></div>
								<div
									className=""
									style={{
										left: progressBar + "%",
									}}
								></div>
							</div>

							<span className="">
								{max === "0" ? "0:00" : getTime(max)}
							</span>
						</div>
					</div>
					<div className="flex items-center gap-x-2">
						{volume <= "1" && volume > "0.5" && (
							<BsFillVolumeUpFill
								size={25}
								color="#FFF"
								onClick={() => setVolume("0")}
							/>
						)}
						{volume <= "0.5" && volume > "0" && (
							<BsVolumeDownFill
								size={25}
								color="#FFF"
								onClick={() => setVolume("0")}
							/>
						)}
						{volume === "0" && (
							<BsFillVolumeMuteFill
								size={25}
								color="#FFF"
								onClick={() => setVolume("0.5")}
							/>
						)}
						<div className="">
							<input
								type="range"
								step="any"
								value={volume}
								min="0"
								max="1"
								onChange={(e) => {
									setVolume(e.target.value);
									setVolumeBarProgress(
										(
											parseFloat(e.target.value) * 100
										).toString()
									);
								}}
							/>
							<div
								className=""
								style={{
									width: volumeBarProgress + "%",
								}}
							></div>
							<div
								className=""
								style={{
									left: volumeBarProgress + "%",
								}}
							></div>
						</div>
					</div>
				</div>
			) : (
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
			)}
		</>
	);
};

export default Player;
