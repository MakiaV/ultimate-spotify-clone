declare interface Album {
	id: string;
	albumName: string;
	albumArtwork: string;
	albumYear?: number;
	albumType: string;
	albumGenre: {
		id: string;
		genreName: string;
	};
	albumLikes: [User];
	albumArtist: Artist;
	songs: [Song];
}
