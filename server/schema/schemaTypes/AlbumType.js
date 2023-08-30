import {
	GraphQLObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLInt,
	GraphQLList,
	GraphQLEnumType,
} from "graphql";
import ArtistType from "./ArtistType.js";
import GenreType from "./GenreType.js";
import SongType from "./SongType.js";
import UserType from "./UserType.js";
import ArtistModel from "../../models/Artist.js";
import SongModel from "../../models/Song.js";
import UserModel from "../../models/User.js";
import GenreModel from "../../models/Genre.js";

const AlbumType = new GraphQLObjectType({
	name: "Album",
	fields: () => ({
		id: { type: GraphQLID },
		albumName: { type: GraphQLString },
		albumArtist: {
			type: ArtistType,
			resolve: async (parent, args) => {
				return ArtistModel.findById(parent.albumArtist);
			},
		},
		albumGenre: {
			type: GenreType,
			resolve: async (parent, args) => {
				return GenreModel.findById(parent.albumGenre);
			},
		},
		albumArtwork: { type: GraphQLString },
		albumBackground: { type: GraphQLString },

		albumYear: { type: GraphQLInt },
		albumLikes: {
			type: GraphQLList(UserType),
			// resolve: async (parent, args) => {
			// 	const lkr = await parent.albumLikes.map((liker) => {
			// 		return UserModel.findById(liker);
			// 	});
			// 	return lkr;
			// },
		},

		albumType: { type: GraphQLString },
		songs: {
			type: GraphQLList(SongType),
			resolve: async (parent, args) => {
				const sg = await parent.songs.map((song) => {
					return SongModel.findById(song);
				});
				return sg;
			},
		},
	}),
});

export default AlbumType;
