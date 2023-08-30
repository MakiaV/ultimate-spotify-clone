declare interface Playlist {
	id: string;
	playlistName: string;
	playlistDescription: string;
	playlistArtwork: string;
	playlistOwner: string;
	playlistLikes: [User];
	playlistArtists: [Artist];
	songs: [Song];
	isUserPlaylist: boolean;
}
