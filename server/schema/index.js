const {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLList,
	GraphQLNonNull,
	GraphQLInputObjectType,
	GraphQLID,
} = require("graphql");

const AlbumType = require("./schemaTypes/AlbumType");
const Album = require("../models/Album");
const mutation = require("./schemaMutations");
const ArtistType = require("./schemaTypes/ArtistType");
const Artist = require("../models/Artist");
const PlaylistType = require("./schemaTypes/PlaylistType");
const Playlist = require("../models/Playlist");
const SongType = require("./schemaTypes/SongType");
const Song = require("../models/Song");
const UserType = require("./schemaTypes/UserType");
const UserModel = require("../models/User");

const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: {
		users: {
			type: new GraphQLList(UserType),

			resolve(parent, args) {
				return UserModel.find().populate([
					"userPlaylists",
					"artistFollow",
					"artistLikes",
					"albumLikes",
					"playlistLikes",
					"albumSongs",
				]);
			},
		},
		user: {
			type: UserType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return UserModel.findById(args.id).populate([
					"userPlaylists",
					"artistFollow",
					"artistLikes",
					"albumLikes",
					"playlistLikes",
					"albumSongs",
				]);
			},
		},
		album: {
			type: AlbumType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return Album.findById(args.id).populate([
					"albumSongs",
					"albumGenre",
					"albumArtist",
				]);
			},
		},
		albums: {
			type: new GraphQLList(AlbumType),
			resolve(parent, args) {
				return Album.find().populate([
					"albumSongs",
					"albumGenre",
					"albumArtist",
				]);
			},
		},
		playlists: {
			type: new GraphQLList(PlaylistType),
			resolve(parent, args) {
				return Playlist.find().populate([
					"albumSongs",
					"playlistOwner",
					"playlistArtists",
				]);
			},
		},
		playlist: {
			type: PlaylistType,
			args: { id: { type: GraphQLID } },

			resolve(parent, args) {
				return Playlist.findById(args.id).populate([
					"albumSongs",
					"playlistOwner",
					"playlistArtists",
				]);
			},
		},
		artists: {
			type: new GraphQLList(ArtistType),
			resolve(parent, args) {
				return Artist.find().populate("artistAlbums");
			},
		},
		artist: {
			type: ArtistType,
			args: { id: { type: GraphQLID } },

			resolve(parent, args) {
				return Artist.findById(args.id).populate("artistAlbums");
			},
		},
		songs: {
			type: new GraphQLList(SongType),

			resolve(parent, args) {
				return Song.find().populate("albumSong");
			},
		},
		song: {
			type: SongType,
			args: { id: { type: GraphQLID } },

			resolve(parent, args) {
				return Song.findById(args.id).populate("albumSong");
			},
		},
		albumSongs: {
			type: new GraphQLList(SongType),
			args: { id: { type: GraphQLID } },

			resolve: async (parent, args) => {
				// const songArray = await Song.find().where(args.id).equals(songArtist[0].id);
				const songArray = await Song.find().populate("albumSong");
				const newArr = songArray.filter(
					(elm) => args.id == elm.songArtist[0]
				);
				const sortArr = newArr.sort(
					(a, b) => b.songPlaycount - a.songPlaycount
				);

				return sortArr.slice(0, 10);
			},
		},
	},
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation,
});
