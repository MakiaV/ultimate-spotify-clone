const {
	GraphQLObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLInt,
	GraphQLList,
} = require("graphql");
const ArtistType = require("./ArtistType");
const GenreType = require("./GenreType");
const SongType = require("./SongType");

const AlbumType = new GraphQLObjectType({
	name: "Album",
	fields: () => ({
		id: { type: GraphQLID },
		albumName: { type: GraphQLString },
		albumArtist: { type: GraphQLList(ArtistType) },
		albumGenre: { type: GenreType },
		albumArtwork: { type: GraphQLString },
		albumYear: { type: GraphQLInt },
		albumLikes: { type: GraphQLInt },
		albumSongs: {
			type: GraphQLList(SongType),
		},
	}),
});

module.exports = AlbumType;
