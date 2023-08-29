declare interface Playlist {
	id: string;
	playlistName: string;
	playlistDescription: string;
	playlistArtwork: string;
	playlistOwner: string;
	playlistLikes: number;
	playlistArtists: [Artist];
	albumSongs: [Song];
	isUserPlaylist: boolean;
	// albumSongs: [
	// 	{
	// 		id: string;
	// 		songTitel: string;
	// 		songGenre?: {
	// 			id: string;
	// 			genreName: string;
	// 		};
	// 		songArtist: [
	// 			{
	// 				id: string;
	// 				artistName: string;
	// 			}
	// 		];
	// 		songPlaycount: number;
	// 		songSrc: string;
	// 		albumArtwork: string;
	// 	}
	// ];
}
