declare interface Song {
	id: string;
	songTitle: string;
	albumArtwork: string;
	songPlaycount: number;
	songLikes: number;
	songArtist: [Artist];
	songGenre?: {
		id: string;
		genreName: string;
	};
	songSrc: string;
	albumSong?: Album;
	index: number;
}
