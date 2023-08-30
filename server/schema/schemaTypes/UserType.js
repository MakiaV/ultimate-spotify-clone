import {
	GraphQLObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLList,
} from "graphql";
import AlbumType from "./AlbumType.js";
import ArtistType from "./ArtistType.js";
import PlaylistType from "./PlaylistType.js";
import SongType from "./SongType.js";

const UserType = new GraphQLObjectType({
	name: "User",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		email: { type: GraphQLString },
		image: { type: GraphQLString },
		hashedPassword: { type: GraphQLString },
		userPlaylists: {
			type: GraphQLList(PlaylistType),
			// resolve: async (parent, args) => {
			// 	const pl = await parent.userPlaylists.map((playlist) => {
			// 		console.log("parent", playlist.id);
			// 		return PlaylistModel.findById(playlist.id);
			// 	});
			// 	return pl;
			// },
		},

		artistLikes: {
			type: GraphQLList(ArtistType),
		},
		albumLikes: {
			type: GraphQLList(AlbumType),
		},
		playlistLikes: {
			type: GraphQLList(PlaylistType),
		},
		songs: {
			type: GraphQLList(SongType),
		},
	}),
});

export default UserType;
