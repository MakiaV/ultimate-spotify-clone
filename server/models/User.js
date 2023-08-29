const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	hashedPassword: {
		type: String,
		required: true,
		minlength: 5,
	},
	image: {
		type: String,
	},
	userPlaylists: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Playlist",
		},
	],
	artistFollow: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Artist",
		},
	],
	artistLikes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Artist",
		},
	],
	albumLikes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Album",
		},
	],
	playlistLikes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Playlist",
		},
	],
	albumSongs: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Song",
		},
	],
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
