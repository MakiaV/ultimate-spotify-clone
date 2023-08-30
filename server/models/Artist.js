import mongoose from "mongoose";

const ArtistSchema = new mongoose.Schema({
	artistName: {
		type: String,
	},
	artistPhoto: {
		type: String,
	},
	artistBackground: {
		type: String,
	},
	artistInfos: {
		type: String,
	},

	artistAlbums: [{ type: mongoose.Schema.Types.ObjectId, ref: "Album" }],

	artistLikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const ArtistModel = mongoose.model("Artist", ArtistSchema);

export default ArtistModel;
