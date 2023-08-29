const {
	GraphQLObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLInt,
	GraphQLList,
	GraphQLBoolean,
} = require("graphql");
const User = require("../../models/User");
const ArtistType = require("./ArtistType");
const SongType = require("./SongType");
// const UserType = require("./UserType");

const PlaylistType = new GraphQLObjectType({
	name: "Playlist",
	fields: () => ({
		id: { type: GraphQLID },
		playlistName: { type: GraphQLString },
		playlistDescription: { type: GraphQLString },
		playlistOwner: {
			type: require("./UserType"),
			resolve: async (parent, args) => {
				// console.log("====>", parent);
				const res = await User.findById(parent.playlistOwner);

				return res;
			},
		},
		playlistArtwork: { type: GraphQLString },
		isUserPlaylist: { type: GraphQLBoolean },
		playlistLikes: { type: GraphQLInt },
		playlistArtists: {
			type: GraphQLList(ArtistType),
		},
		albumSongs: {
			type: GraphQLList(SongType),
		},
	}),
});

module.exports = PlaylistType;
