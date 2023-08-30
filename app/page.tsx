"use client";

import Header from "./components/Header";
import { useQuery, gql } from "@apollo/client";

import Image from "next/image";
import PlaylistCard from "./components/PlaylistCard";
import GET_ALBUMS from "@/queries/albumsQuery";
import GET_PLAYLISTS from "@/queries/playlistsQuery";

export default function Home() {
	const QueryMultiple = () => {
		const res1 = useQuery(GET_ALBUMS);
		const res2 = useQuery(GET_PLAYLISTS);

		return [res1, res2];
	};

	const [
		{ error: errorAlbums, loading: loadingAlbums, data: dataAlbums },
		{
			error: errorPlaylists,
			loading: loadingPlaylists,
			data: dataPlaylists,
		},
	] = QueryMultiple();

	// console.log("dataPlaylists", dataPlaylists);
	// console.log("dataAlbums", dataAlbums);

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
