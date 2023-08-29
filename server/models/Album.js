const mongoose = require("mongoose");

const AlbumSchema = new mongoose.Schema({
	albumName: {
		type: String,
	},
	albumYear: {
		type: Number,
	},
	albumLikes: {
		type: Number,
	},
	albumArtist: [
		{
			type: mongoose.Schema.Types.ObjectId,

			ref: "Artist",
		},
	],
	albumGenre: {
		type: mongoose.Schema.Types.ObjectId,

		ref: "Genre",
	},
	albumArtwork: {
		type: String,
	},

	albumSongs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],
});

const AlbumModel = mongoose.model("Album", AlbumSchema);

module.exports = AlbumModel;
