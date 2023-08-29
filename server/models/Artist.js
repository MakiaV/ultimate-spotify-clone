const mongoose = require("mongoose");

const ArtistSchema = new mongoose.Schema({
	artistName: {
		type: String,
	},
	artistPhoto: {
		type: String,
	},
	artistBanner: {
		type: String,
	},
	artistInfos: {
		type: String,
	},

	artistAlbums: [{ type: mongoose.Schema.Types.ObjectId, ref: "Album" }],
	artistLikes: { type: Number },

	artistFollowers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

	// artistBestTracks: []
});

const ArtistModel = mongoose.model("Artist", ArtistSchema);

module.exports = ArtistModel;
