declare interface Album {
	id: string;
	albumName: string;
	albumArtwork: string;
	albumYear?: number;
	albumGenre: {
		id: string;
		genreName: string;
	};
	albumLikes: number;
	albumArtist: [Artist];
	albumSongs: [Song];
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
