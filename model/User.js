import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
	{
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
		password: {
			type: String,
			required: true,
			minlength: 5,
		},
		image: {
			type: String,
		},
		birth: {
			type: Object,
		},

		gender: {
			type: String,
		},

		userPlaylists: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Playlist",
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
		songs: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Song",
			},
		],
	},
	{
		timestamps: true,
	}
);

const User = models.User || mongoose.model("User", userSchema);
export default User;
