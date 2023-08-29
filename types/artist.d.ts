declare interface Artist {
	id: string;
	artistName: string;
	artistPhoto: string;
	artistInfos: string;
	artistLikes: number;
	artistFollowers: [{}];
	artistAlbums: [Album];
	// artistAlbums: [
	// 	{
	// 		id: string;
	// 		albumName: string;
	// 		albumArtwork: string;
	// 		albumYear?: number;
	// 		albumGenre: {
	// 			id: string;
	// 			genreName: string;
	// 		};
	// 		albumLikes: number;
	// 		albumSongs: [
	// 			{
	// 				id: number;
	// 				songTitel: string;
	// 				albumGenre: {
	// 					id: string;
	// 					genreName: string;
	// 				};
	// 				songArtist: [
	// 					{
	// 						id: string;
	// 						artistName: string;
	// 					}
	// 				];
	// 				songPlaycount: number;
	// 				songSrc: string;
	// 				albumArtwork: string;
	// 				albumSong: Album;
	// 			}
	// 		];
	// 		albumArtist: {
	// 			id: string;
	// 			artistName: string;
	// 		};
	// 	}
	// ];
}
