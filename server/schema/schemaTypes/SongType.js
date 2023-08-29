const {
	GraphQLObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLInt,
	GraphQLList,
} = require("graphql");
const Album = require("../../models/Album");
const Artist = require("../../models/Artist");
const Genre = require("../../models/Genre");
// const AlbumType = require("./AlbumType");
const ArtistType = require("./ArtistType");
const GenreType = require("./GenreType");

const SongType = new GraphQLObjectType({
	name: "Song",
	fields: () => ({
		id: { type: GraphQLID },
		songTitle: { type: GraphQLString },
		songArtist: {
			type: GraphQLList(ArtistType),
			resolve: async (parent, args) => {
				const art = await parent.songArtist.map((artist) => {
					return Artist.findById(artist);
				});
				return art;
			},
		},
		songSrc: { type: GraphQLString },
		songGenre: {
			type: GenreType,
			resolve(parent, args) {
				return Genre.findById(parent.songGenre);
			},
		},
		albumArtwork: { type: GraphQLString },
		songPlaycount: { type: GraphQLInt },
		songLikes: { type: GraphQLInt },
		albumSong: {
			type: require("./AlbumType"),
			resolve(parent, args) {
				return Album.findById(parent.albumSong);
			},
		},
	}),
});

module.exports = SongType;
