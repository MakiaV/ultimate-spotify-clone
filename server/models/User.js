import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
			maxLength: 10,
			minlength: 3,
			trim: true,
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

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
