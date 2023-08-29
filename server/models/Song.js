const mongoose = require("mongoose");

const SongSchema = new mongoose.Schema({
	songTitle: {
		type: String,
	},

	songArtist: [
		{
			type: mongoose.Schema.Types.ObjectId,

			ref: "Artist",
		},
	],
	songGenre: {
		type: mongoose.Schema.Types.ObjectId,

		ref: "Genre",
	},
	albumSong: {
		type: mongoose.Schema.Types.ObjectId,

		ref: "Album",
	},
	albumArtwork: {
		type: String,
	},
	songSrc: {
		type: String,
	},
	songPlaycount: {
		type: Number,
	},
	songLikes: {
		type: Number,
	},
});

const SongModel = mongoose.model("Song", SongSchema);

module.exports = SongModel;
