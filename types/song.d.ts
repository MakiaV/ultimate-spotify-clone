declare interface Song {
	id: string;
	songTitle: string;
	songPlaycount: number;
	songLikes: number;
	songArtist: [Artist];
	songGenre?: {
		id: string;
		genreName: string;
	};
	songSrc: string;
	songAlbum?: Album;
	index: number;
}
