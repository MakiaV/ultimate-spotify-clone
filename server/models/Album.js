import mongoose from "mongoose";

const AlbumSchema = new mongoose.Schema({
	albumName: {
		type: String,
	},
	albumYear: {
		type: Number,
	},
	albumLikes: [
		{
			type: mongoose.Schema.Types.ObjectId,

			ref: "User",
		},
	],
	albumArtist: {
		type: mongoose.Schema.Types.ObjectId,

		ref: "Artist",
	},

	albumGenre: {
		type: mongoose.Schema.Types.ObjectId,

		ref: "Genre",
	},
	albumArtwork: {
		type: String,
	},
	albumBackground: {
		type: String,
	},

	albumType: {
		type: String,
		enum: ["Album", "Single", "EP"],
	},

	songs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],
});

const AlbumModel = mongoose.model("Album", AlbumSchema);

export default AlbumModel;
