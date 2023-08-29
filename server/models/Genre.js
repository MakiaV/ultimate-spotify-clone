const mongoose = require("mongoose");

const GenreSchema = new mongoose.Schema({
	genreName: {
		type: String,
	},
	genreInfos: {
		type: String,
	},
});

const GenreModel = mongoose.model("Genre", GenreSchema);

module.exports = GenreModel;
