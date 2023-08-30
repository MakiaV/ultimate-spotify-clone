import mongoose from "mongoose";

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
	songAlbum: {
		type: mongoose.Schema.Types.ObjectId,

		ref: "Album",
	},

	songSrc: {
		type: String,
	},
	songLyric: {
		type: String,
	},
	songPlaycount: {
		type: Number,
	},
	songLikes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	],
});

const SongModel = mongoose.model("Song", SongSchema);

export default SongModel;
