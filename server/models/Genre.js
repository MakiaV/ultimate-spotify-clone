import mongoose from "mongoose";

const GenreSchema = new mongoose.Schema({
	genreName: {
		type: String,
	},
	genreInfos: {
		type: String,
	},
});

const GenreModel = mongoose.model("Genre", GenreSchema);

export default GenreModel;
