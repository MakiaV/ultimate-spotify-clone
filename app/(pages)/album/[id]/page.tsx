"use client";
import Header from "@/app/components/Header";
import Track from "@/app/components/Track";
import getAbum from "@/queries/albumQuery";
import { useQuery, gql, useMutation } from "@apollo/client";
import Image from "next/image";

import { useContext, useEffect, useRef, useState } from "react";

import { useSelector, useDispatch } from "react-redux";

const Album = ({ params }: { params: { id: string } }) => {
	const albumID = params.id;

	const data = getAbum(albumID);

	const albumData: Album = data.album;

	console.log("albumData", albumData);

	return (
		<>
			<Header />
			<div className="px-5 pt-[85px] ">
				<div className="flex gap-x-5 items-end">
					<Image
						src={albumData?.albumArtwork}
						alt="coverart"
						width={220}
						height={220}
					/>
					<div>
						<p>{albumData?.albumType}</p>
						<h1 className="md:text-xl lg:text-3xl xl:text-5xl font-extrabold truncate mt-2 mb-8">
							{albumData?.albumName}
						</h1>
						<div className="flex items-center gap-x-2">
							<Image
								src={albumData?.albumArtist.artistPhoto}
								alt="artist"
								width={30}
								height={30}
								className="rounded-full"
							/>
							<span>{albumData?.albumArtist.artistName}</span>
							<div className="h-1 w-1 rounded-full bg-white"></div>
							<span>{albumData?.albumYear}</span>
							<div className="h-1 w-1 rounded-full bg-white"></div>

							<span>{albumData?.songs.length} songs</span>
						</div>
					</div>
				</div>
				<div className="mt-4">
					<div>
						<p>TODO: Play n like Btn</p>
					</div>
					<div className="mt-4">
						{albumData?.songs.map((song: Song, index: number) => (
							<Track
								key={index}
								song={song}
								index={index}
								dataProps={data}
							/>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default Album;
