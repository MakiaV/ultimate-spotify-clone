declare interface Artist {
	id: string;
	artistName: string;
	artistPhoto: string;
	artistInfos: string;
	artistLikes: [User];
	artistAlbums: [Album];
}
