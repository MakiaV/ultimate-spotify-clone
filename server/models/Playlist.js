const mongoose = require("mongoose");

const PlaylistSchema = new mongoose.Schema({
	playlistName: {
		type: String,
	},
	playlistDescription: {
		type: String,
	},
	playlistLikes: {
		type: Number,
	},
	playlistOwner: {
		type: mongoose.Schema.Types.ObjectId,

		ref: "User",
		// ref: "Artist",
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

	albumSongs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],
});

const PlaylistModel = mongoose.model("Playlist", PlaylistSchema);

module.exports = PlaylistModel;
