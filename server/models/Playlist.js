import mongoose from "mongoose";

const PlaylistSchema = new mongoose.Schema({
	playlistName: {
		type: String,
	},
	playlistDescription: {
		type: String,
	},
	playlistLikes: [
		{
			type: mongoose.Schema.Types.ObjectId,

			ref: "User",
		},
	],
	playlistOwner: {
		type: mongoose.Schema.Types.ObjectId,

		ref: "User",
	},
	playlistArtists: [
		{
			type: mongoose.Schema.Types.ObjectId,

			ref: "Artist",
		},
	],

	playlistArtwork: {
		type: String,
	},
	isUserPlaylist: {
		type: Boolean,
	},

	songs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],
});

const PlaylistModel = mongoose.model("Playlist", PlaylistSchema);

export default PlaylistModel;
