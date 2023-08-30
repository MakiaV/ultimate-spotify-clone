import {
	GraphQLObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLList,
	GraphQLNonNull,
	GraphQLInt,
	GraphQLBoolean,
	GraphQLEnumType,
} from "graphql";
import PlaylistModel from "../../models/Playlist.js";
import UserModel from "../../models/User.js";
import UserType from "../schemaTypes/UserType.js";

export const playlistMutations = {
	addLikedPlaylist: {
		type: UserType,
		args: {
			id: { type: GraphQLNonNull(GraphQLID) },
			playlistId: { type: GraphQLID },
		},
		resolve: async (parent, args) => {
			const user = await UserModel.findById(args.id);

			const likedPlaylistsArr = user.playlistLikes;
			likedPlaylistsArr[likedPlaylistsArr.length] = args.playlistId;

			return UserModel.findByIdAndUpdate(
				args.id,
				{
					$set: {
						playlistLikes: likedPlaylistsArr,
					},
				},
				{ new: true }
			).then(async (res) => {
				const ID = res.id;
				// console.log("response", res.id);
				const playlistData = await PlaylistModel.findById(
					args.playlistId
				);

				const newPlaylistsLikedArray = playlistData.playlistLikes;
				newPlaylistsLikedArray[newPlaylistsLikedArray.length] = ID;
				// console.log("newPLArray", newPLArray);
				return PlaylistModel.findByIdAndUpdate(
					args.playlistId,
					{
						$set: {
							playlistLikes: newPlaylistsLikedArray,
						},
					},
					{ new: true }
				);
			});
		},
	},

	removeLikedPlaylist: {
		type: UserType,
		args: {
			id: { type: GraphQLNonNull(GraphQLID) },
			playlistId: { type: GraphQLID },
		},
		resolve: async (parent, args) => {
			const user = await UserModel.findById(args.id);

			const likedPlaylistsArr = user.playlistLikes;

			const newLikedPlaylistsArr = likedPlaylistsArr.filter(function (
				item
			) {
				return item != args.playlistId;
			});

			return UserModel.findByIdAndUpdate(
				args.id,
				{
					$set: {
						playlistLikes: newLikedPlaylistsArr,
					},
				},
				{ new: true }
			).then(async (res) => {
				const ID = res.id;
				// console.log("response", res.id);
				const playlistData = await PlaylistModel.findById(
					args.playlistId
				);

				const PlaylistsLikedArray = playlistData.playlistLikes;
				const newLikedPlaylistsArr = PlaylistsLikedArray.filter(
					function (item) {
						return item != args.id;
					}
				);
				return PlaylistModel.findByIdAndUpdate(
					args.playlistId,
					{
						$set: {
							playlistLikes: newLikedPlaylistsArr,
						},
					},
					{ new: true }
				);
			});
		},
	},
};
