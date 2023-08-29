const {
	GraphQLObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLInt,
	GraphQLList,
} = require("graphql");

const Album = require("../../models/Album");
const Artist = require("../../models/Artist");
const GenreModel = require("../../models/Genre");
const User = require("../../models/User");

// const AlbumType = require("./AlbumType");
// const UserType = require("./UserType");

const ArtistType = new GraphQLObjectType({
	name: "Artist",
	fields: () => ({
		id: { type: GraphQLID },
		artistName: { type: GraphQLString },
		artistPhoto: { type: GraphQLString },
		artistBanner: { type: GraphQLString },
		artistInfos: { type: GraphQLString },
		artistAlbums: {
			type: GraphQLList(require("./AlbumType")),
			resolve: async (parent, args) => {
				// console.log("====>", parent.artistAlbums);
				const res = await parent.artistAlbums.map((album) => {
					return Album.findById(album.id).populate([
						"albumGenre",
						"albumArtist",
						"albumSongs",
					]);
				});

				return res;
			},
		},
		artistFollowers: {
			type: GraphQLList(require("./UserType")),
			resolve: async (parent, args) => {
				console.log("====>", parent);
				const res = await parent.artistFollowers.map((user) => {
					return User.findById(user);
					// .populate([
					// 	"albumGenre",
					// 	"albumArtist",
					// 	"albumSongs",
					// ]);
				});

				return res;
			},
			// resolve(parent, args) {
			// 	return User.findById(args.id);
			// },
		},
		artistLikes: { type: GraphQLInt },
	}),
});

module.exports = ArtistType;
