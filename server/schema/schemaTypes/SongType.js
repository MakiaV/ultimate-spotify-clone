import {
	GraphQLObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLInt,
	GraphQLList,
} from "graphql";
import ArtistType from "./ArtistType.js";
import ArtistModel from "../../models/Artist.js";
import GenreType from "./GenreType.js";

import GenreModel from "../../models/Genre.js";
import AlbumModel from "../../models/Album.js";
import AlbumType from "./AlbumType.js";
import UserType from "./UserType.js";
import CommentSongType from "./CommentSongType.js";

const SongType = new GraphQLObjectType({
	name: "Song",
	fields: () => ({
		id: { type: GraphQLID },
		songTitle: { type: GraphQLString },
		songArtist: {
			type: GraphQLList(ArtistType),
			resolve: async (parent, args) => {
				const art = await parent.songArtist.map((artist) => {
					return ArtistModel.findById(artist);
				});
				return art;
			},
		},
		songSrc: { type: GraphQLString },
		songLyric: { type: GraphQLString },
		songGenre: {
			type: GenreType,
			resolve(parent, args) {
				return GenreModel.findById(parent.songGenre);
			},
		},
		albumArtwork: {
			type: GraphQLString,
			// resolve(parent, args) {
			// 	return AlbumModel.findById(parent.songGenre);
			// },
		},
		songPlaycount: { type: GraphQLInt },
		songLikes: { type: GraphQLList(UserType) },
		songComments: { type: GraphQLList(CommentSongType) },
		songAlbum: {
			type: AlbumType,
			resolve(parent, args) {
				return AlbumModel.findById(parent.songAlbum);
			},
		},
	}),
});

export default SongType;
