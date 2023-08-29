const mongoose = require("mongoose");
var _ = require("lodash");

const {
	GraphQLObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLSchema,
	GraphQLList,
	GraphQLNonNull,
	GraphQLEnumType,
	GraphQLInt,
	GraphQLBoolean,
} = require("graphql");

const ArtistType = require("../schemaTypes/ArtistType");
const AlbumType = require("../schemaTypes/AlbumType");
const UserType = require("../schemaTypes/UserType");
const Artist = require("../../models/Artist");
const GenreType = require("../schemaTypes/GenreType");
const Genre = require("../../models/Genre");
const Album = require("../../models/Album");
const PlaylistType = require("../schemaTypes/PlaylistType");
const Playlist = require("../../models/Playlist");
const SongType = require("../schemaTypes/SongType");
const Song = require("../../models/Song");
const UserModel = require("../../models/User");

const mutation = new GraphQLObjectType({
	name: "Mutation",
	fields: {
		addArtist: {
			type: ArtistType,
			args: {
				artistName: { type: GraphQLNonNull(GraphQLString) },
				artistInfos: { type: GraphQLString },
				artistPhoto: { type: GraphQLString },
				artistBanner: { type: GraphQLString },
				artistAlbums: {
					type: GraphQLList(GraphQLID),
				},
				artistFollowers: { type: GraphQLList(GraphQLID) },
				artistLikes: { type: GraphQLInt },
			},
			resolve(parent, args) {
				const artist = new Artist({
					artistName: args.artistName,
					artistPhoto: args.artistPhoto,
					artistBanner: args.artistBanner,
					artistInfos: args.artistInfos,
					artistAlbums: args.artistAlbums,
					artistLikes: args.artistLikes,
					artistFollowers: args.artistFollowers,
				});
				return artist.save();
			},
		},

		addGenre: {
			type: GenreType,
			args: {
				genreName: { type: GraphQLNonNull(GraphQLString) },
				genreInfos: { type: GraphQLString },
			},
			resolve(parent, args) {
				const genre = new Genre({
					genreName: args.genreName,
					genreInfos: args.genreInfos,
				});
				return genre.save();
			},
		},

		addAlbum: {
			type: AlbumType,
			args: {
				albumName: { type: GraphQLNonNull(GraphQLString) },
				albumYear: { type: GraphQLInt },
				albumLikes: { type: GraphQLInt },
				albumArtist: { type: GraphQLList(GraphQLID) },
				albumGenre: { type: GraphQLString },
				albumArtwork: { type: GraphQLString },
				albumSongs: {
					type: GraphQLList(GraphQLID),
				},
			},
			resolve(parent, args) {
				const album = new Album({
					albumName: args.albumName,
					albumYear: args.albumYear,
					albumLikes: args.albumLikes,
					albumArtist: args.albumArtist,
					albumGenre: args.albumGenre,
					albumArtwork: args.albumArtwork,
					albumSongs: args.albumSongs,
				});
				return album.save();
			},
		},

		addPlaylist: {
			type: PlaylistType,
			args: {
				playlistName: { type: GraphQLNonNull(GraphQLString) },
				playlistDescription: { type: GraphQLString },
				playlistLikes: { type: GraphQLInt },
				playlistOwner: { type: GraphQLID },
				playlistArtwork: { type: GraphQLString },
				isUserPlaylist: { type: GraphQLBoolean },
				playlistArtists: {
					type: GraphQLList(GraphQLID),
				},
				albumSongs: {
					type: GraphQLList(GraphQLID),
				},
			},
			resolve(parent, args) {
				const playlist = new Playlist({
					playlistName: args.playlistName,
					playlistDescription: args.playlistDescription,
					playlistLikes: args.playlistLikes,
					isUserPlaylist: args.isUserPlaylist,
					playlistOwner: args.playlistOwner,
					playlistArtwork: args.playlistArtwork,
					playlistArtists: args.playlistArtists,
					albumSongs: args.albumSongs,
				});
				return playlist.save().then(async (res) => {
					const ID = res.id;
					// console.log("response", res.id);
					const userData = await UserModel.findById(
						args.playlistOwner
					);
					// const myId =
					// 	mongoose.Types.ObjectId.createFromHexString(ID);
					// console.log("USERDATA", userData.userPlaylists);
					// console.log("myId", myId);
					const newPLArray = userData.userPlaylists;
					newPLArray[newPLArray.length] = ID;
					// console.log("newPLArray", newPLArray);
					return UserModel.findByIdAndUpdate(
						args.playlistOwner,
						{
							$set: {
								userPlaylists: newPLArray,
							},
						},
						{ new: true }
					);
				});
			},
		},

		addSong: {
			type: SongType,
			args: {
				songTitle: { type: GraphQLNonNull(GraphQLString) },
				albumArtwork: { type: GraphQLString },
				albumSong: { type: GraphQLID },
				songPlaycount: { type: GraphQLInt },
				songLikes: { type: GraphQLInt },
				songGenre: { type: GraphQLID },
				songSrc: { type: GraphQLString },
				songArtist: {
					type: GraphQLList(GraphQLID),
				},
			},
			resolve(parent, args) {
				const song = new Song({
					songTitle: args.songTitle,
					albumArtwork: args.albumArtwork,
					albumSong: args.albumSong,
					songPlaycount: args.songPlaycount,
					songLikes: args.songLikes,
					songGenre: args.songGenre,
					songSrc: args.songSrc,
					songArtist: args.songArtist,
				});
				return song.save();
			},
		},

		updateSongPlaycount: {
			type: SongType,
			args: {
				id: { type: GraphQLNonNull(GraphQLID) },
				songPlaycount: { type: GraphQLInt },
			},
			resolve(parent, args) {
				return Song.findByIdAndUpdate(
					args.id,
					{
						$set: {
							songPlaycount: args.songPlaycount,
						},
					},
					{ new: true }
				);
			},
		},

		addSongToPlaylist: {
			type: PlaylistType,
			args: {
				id: { type: GraphQLNonNull(GraphQLID) },
				songId: { type: GraphQLID },
			},
			resolve: async (parent, args) => {
				const playlist = await Playlist.findById(args.id);
				console.log("plSongArr", playlist.albumSongs);
				const songsArr = playlist.albumSongs;
				songsArr[songsArr.length] = args.songId;
				console.log("songArr", songsArr);
				return Playlist.findByIdAndUpdate(
					args.id,
					{
						$set: {
							albumSongs: songsArr,
						},
					},
					{ new: true }
				);
			},
		},

		addLikedSongs: {
			type: UserType,
			args: {
				id: { type: GraphQLNonNull(GraphQLID) },
				songId: { type: GraphQLID },
			},
			resolve: async (parent, args) => {
				const user = await UserModel.findById(args.id);

				const likedSongsArr = user.albumSongs;
				likedSongsArr[likedSongsArr.length] = args.songId;

				return UserModel.findByIdAndUpdate(
					args.id,
					{
						$set: {
							albumSongs: likedSongsArr,
						},
					},
					{ new: true }
				);
			},
		},

		removeLikedSongs: {
			type: UserType,
			args: {
				id: { type: GraphQLNonNull(GraphQLID) },
				songId: { type: GraphQLID },
			},
			resolve: async (parent, args) => {
				const user = await UserModel.findById(args.id);

				const likedSongsArr = user.albumSongs;
				const newLikedSongsArr = likedSongsArr.filter(function (item) {
					return item != args.songId;
				});

				console.log("AFTER", newLikedSongsArr);
				console.log("BEFORE", user.albumSongs);

				return UserModel.findByIdAndUpdate(
					args.id,
					{
						$set: {
							albumSongs: newLikedSongsArr,
						},
					},
					{ new: true }
				);
			},
		},
	},
});

module.exports = mutation;
