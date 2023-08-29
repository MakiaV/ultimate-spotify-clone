"use client";

import Header from "./components/Header";
import { useQuery } from "@apollo/client";
import { GET_ALBUMS } from "../queries/albumQuerie";
import { GET_PLAYLISTS } from "../queries/playlistQuerie";
import Image from "next/image";
import PlaylistCard from "./components/PlaylistCard";

export default function Home() {
	const QueryMultiple = () => {
		const res1 = useQuery(GET_PLAYLISTS);
		const res2 = useQuery(GET_ALBUMS);
		return [res1, res2];
	};

	const [
		{
			error: errorPlaylists,
			loading: loadingPlaylists,
			data: dataPlaylists,
		},
		{ error: errorAlbums, loading: loadingAlbums, data: dataAlbums },
	] = QueryMultiple();

	console.log("dataAlbums", dataAlbums);

	return (
		<div className=" flex-grow  rounded-lg h-full w-full overflow-hidden overflow-y-auto">
			<Header />
			<div className="min-h-full px-4 pt-[70px] bg-gradient-to-b from-[#1E1E1E] from-10%  to-[#121212] to-90%">
				<h1 className="font-bold text-2xl">Spotify Playlists</h1>
				<div
					className="
        grid 
        grid-cols-2 
        sm:grid-cols-3 
        md:grid-cols-3 
        lg:grid-cols-4 
        xl:grid-cols-5 
        2xl:grid-cols-8 
        gap-4 
        mt-4
      "
				>
					{dataAlbums?.albums.map((album: any) => (
						<PlaylistCard key={album.id} album={album} />
					))}
				</div>
			</div>
		</div>
	);
}
