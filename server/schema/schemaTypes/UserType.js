const {
	GraphQLObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLList,
} = require("graphql");
const PlaylistModel = require("../../models/Playlist");
const SongModel = require("../../models/Song");
const AlbumType = require("./AlbumType");
const ArtistType = require("./ArtistType");
const PlaylistType = require("./PlaylistType");
const SongType = require("./SongType");

const UserType = new GraphQLObjectType({
	name: "User",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		email: { type: GraphQLString },
		image: { type: GraphQLString },
		hashedPassword: { type: GraphQLString },
		userPlaylists: {
			type: GraphQLList(require("./PlaylistType")),
			// resolve: async (parent, args) => {
			// 	const pl = await parent.userPlaylists.map((playlist) => {
			// 		console.log("parent", playlist.id);
			// 		return PlaylistModel.findById(playlist.id);
			// 	});
			// 	return pl;
			// },
		},
		artistFollow: {
			type: GraphQLList(ArtistType),
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
		albumSongs: {
			type: GraphQLList(SongType),
		},
	}),
});

module.exports = UserType;
