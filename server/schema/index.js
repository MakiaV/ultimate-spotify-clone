import {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLList,
	GraphQLNonNull,
	GraphQLInputObjectType,
	GraphQLID,
} from "graphql";
import AlbumModel from "../models/Album.js";
import PlaylistModel from "../models/Playlist.js";
import UserModel from "../models/User.js";
import ArtistModel from "../models/Artist.js";
import AlbumType from "./schemaTypes/AlbumType.js";
import ArtistType from "./schemaTypes/ArtistType.js";
import PlaylistType from "./schemaTypes/PlaylistType.js";
import UserType from "./schemaTypes/UserType.js";
import SongType from "./schemaTypes/SongType.js";
import SongModel from "../models/Song.js";
import mutation from "./schemaMutations/index.js";
import GenreType from "./schemaTypes/GenreType.js";
import GenreModel from "../models/Genre.js";

const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: {
		users: {
			type: new GraphQLList(UserType),

			resolve(parent, args) {
				return UserModel.find().populate([
					"userPlaylists",
					"artistLikes",
					"albumLikes",
					"playlistLikes",
					"songs",
				]);
			},
		},
		user: {
			type: UserType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return UserModel.findById(args.id).populate([
					"userPlaylists",
					"artistLikes",
					"albumLikes",
					"playlistLikes",
					"songs",
				]);
			},
		},
		album: {
			type: AlbumType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return AlbumModel.findById(args.id).populate([
					"songs",
					"albumLikes",
					"albumGenre",
					"albumArtist",
				]);
			},
		},
		albums: {
			type: new GraphQLList(AlbumType),
			resolve(parent, args) {
				return AlbumModel.find().populate([
					"songs",
					"albumLikes",
					"albumGenre",
					"albumArtist",
				]);
			},
		},
		playlists: {
			type: new GraphQLList(PlaylistType),
			resolve(parent, args) {
				return PlaylistModel.find().populate([
					"songs",
					"playlistLikes",
					"playlistOwner",
					"playlistArtists",
				]);
			},
		},

		genres: {
			type: new GraphQLList(GenreType),
			resolve(parent, args) {
				return GenreModel.find();
			},
		},
		genre: {
			type: GenreType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return GenreModel.findById(args.id);
			},
		},

		playlist: {
			type: PlaylistType,
			args: { id: { type: GraphQLID } },

			resolve(parent, args) {
				return PlaylistModel.findById(args.id).populate([
					"songs",
					"playlistLikes",
					"playlistOwner",
					"playlistArtists",
				]);
			},
		},
		artists: {
			type: new GraphQLList(ArtistType),
			resolve(parent, args) {
				return ArtistModel.find().populate([
					"artistAlbums",
					"artistLikes",
				]);
			},
		},
		artist: {
			type: ArtistType,
			args: { id: { type: GraphQLID } },

			resolve(parent, args) {
				return ArtistModel.findById(args.id).populate([
					"artistAlbums",
					"artistLikes",
				]);
			},
		},

		tracks: {
			type: new GraphQLList(SongType),

			resolve(parent, args) {
				return SongModel.find().populate([
					"songArtist",
					"songGenre",
					"songAlbum",
					"songLikes",
				]);
			},
		},

		track: {
			type: SongType,
			args: { id: { type: GraphQLID } },

			resolve(parent, args) {
				return SongModel.findById(args.id).populate([
					"songAlbum",
					"songArtist",
					"songGenre",
					"songLikes",
				]);
			},
		},

		songs: {
			type: new GraphQLList(SongType),
			args: { id: { type: GraphQLID } },

			resolve: async (parent, args) => {
				const songArray = await SongModel.find().populate([
					"songAlbum",
				]);
				const newArr = songArray.filter(
					(elm) => args.id == elm.songArtist[0]
				);
				const sortArr = newArr.sort(
					(a, b) => b.songPlaycount - a.songPlaycount
				);

				return sortArr.slice(0, 5);
			},
		},
	},
});

// export default new GraphQLSchema({
// 	query: RootQuery,
// 	mutation,
// });

const MyAppSchema = new GraphQLSchema({
	query: RootQuery,
	mutation: mutation,
});

export default MyAppSchema;
