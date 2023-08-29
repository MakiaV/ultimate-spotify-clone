const mongoose = require("mongoose");

const UserPlaylistSchema = new mongoose.Schema({
	userPlaylistName: {
		type: String,
	},

	albumSongs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
});

const UserPlaylistModel = mongoose.model("UserPlaylist", UserPlaylistSchema);

module.exports = UserPlaylistModel;
