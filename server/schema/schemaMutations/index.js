import axios from "axios";

import {
	GraphQLObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLList,
	GraphQLNonNull,
	GraphQLInt,
	GraphQLBoolean,
	GraphQLEnumType,
} from "graphql";

import ArtistType from "../schemaTypes/ArtistType.js";
import ArtistModel from "../../models/Artist.js";
import GenreModel from "../../models/Genre.js";
import AlbumModel from "../../models/Album.js";
import GenreType from "../schemaTypes/GenreType.js";
import UserType from "../schemaTypes/UserType.js";
import AlbumType from "../schemaTypes/AlbumType.js";
import PlaylistType from "../schemaTypes/PlaylistType.js";
import PlaylistModel from "../../models/Playlist.js";
import UserModel from "../../models/User.js";
import SongType from "../schemaTypes/SongType.js";
import SongModel from "../../models/Song.js";

import { playlistMutations } from "./playlistMutations.js";

const mutation = new GraphQLObjectType({
	name: "Mutation",
	fields: {
		addLikedPlaylist: playlistMutations.addLikedPlaylist,
		removeLikedPlaylist: playlistMutations.removeLikedPlaylist,
		addArtist: {
			type: ArtistType,
			args: {
				artistName: { type: GraphQLNonNull(GraphQLString) },
				artistInfos: { type: GraphQLString },
				artistPhoto: { type: GraphQLString },
				artistBackground: { type: GraphQLString },
				artistAlbums: {
					type: GraphQLList(GraphQLID),
				},
				artistLikes: { type: GraphQLList(GraphQLID) },
				// artistPopularTracks: { type: GraphQLList(GraphQLID) },
				artistComments: { type: GraphQLList(GraphQLID) },
			},
			resolve(parent, args) {
				const artist = new ArtistModel({
					artistName: args.artistName,
					artistPhoto: args.artistPhoto,
					artistBackground: args.artistBackground,
					artistInfos: args.artistInfos,
					artistAlbums: args.artistAlbums,
					artistLikes: args.artistLikes,
					artistComments: args.artistComments,
				});
				return artist.save();
			},
		},

		addGenre: {
			type: GenreType,
			args: {
				genreName: { type: GraphQLNonNull(GraphQLString) },
				genreInfos: { type: GraphQLString },
				genreImg: { type: GraphQLString },
				genreBannerImg: { type: GraphQLString },
				genreBannerPosition: { type: GraphQLString },
			},
			resolve(parent, args) {
				const genre = new GenreModel({
					genreName: args.genreName,
					genreInfos: args.genreInfos,
					genreImg: args.genreImg,
					genreBanner: args.genreBanner,
					genreBannerImg: args.genreBannerImg,
					genreBannerPosition: args.genreBannerPosition,
				});
				return genre.save();
			},
		},

		addAlbum: {
			type: AlbumType,
			args: {
				albumName: { type: GraphQLNonNull(GraphQLString) },
				albumYear: { type: GraphQLInt },
				albumLikes: { type: GraphQLList(GraphQLID) },
				albumArtist: { type: GraphQLID },
				albumGenre: { type: GraphQLString },
				albumArtwork: { type: GraphQLString },
				albumBackground: { type: GraphQLString },
				albumType: {
					type: new GraphQLEnumType({
						name: "AlbumType",
						values: {
							album: { value: "Album" },
							single: { value: "Single" },
							ep: { value: "Ep" },
						},
					}),
					defaultValue: "Album",
				},
				songs: {
					type: GraphQLList(GraphQLID),
				},
			},
			resolve(parent, args) {
				const album = new AlbumModel({
					albumName: args.albumName,
					albumYear: args.albumYear,
					albumLikes: args.albumLikes,
					albumArtist: args.albumArtist,
					albumGenre: args.albumGenre,
					albumArtwork: args.albumArtwork,
					albumBackground: args.albumBackground,
					albumType: args.albumType,
					songs: args.songs,
				});
				return album.save();
			},
		},

		addPlaylist: {
			type: PlaylistType,
			args: {
				playlistName: { type: GraphQLNonNull(GraphQLString) },
				playlistDescription: { type: GraphQLString },
				playlistLikes: { type: GraphQLList(GraphQLID) },
				playlistOwner: { type: GraphQLID },
				playlistArtwork: { type: GraphQLString },
				isUserPlaylist: { type: GraphQLBoolean },
				playlistArtists: {
					type: GraphQLList(GraphQLID),
				},
				songs: {
					type: GraphQLList(GraphQLID),
				},
			},
			resolve(parent, args) {
				const playlist = new PlaylistModel({
					playlistName: args.playlistName,
					playlistDescription: args.playlistDescription,
					playlistLikes: args.playlistLikes,
					isUserPlaylist: args.isUserPlaylist,
					playlistOwner: args.playlistOwner,
					playlistArtwork: args.playlistArtwork,

					playlistArtists: args.playlistArtists,

					songs: args.songs,
				});
				return playlist.save().then(async (res) => {
					const ID = res.id;
					// console.log("response", res.id);
					const userData = await UserModel.findById(
						args.playlistOwner
					);

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

		deletePlaylist: {
			type: PlaylistType,
			args: {
				id: { type: GraphQLNonNull(GraphQLID) },
			},
			resolve(parent, args) {
				return PlaylistModel.findByIdAndRemove(args.id).then(
					async (res) => {
						// console.log("RES", res);
						const ID = res.id;
						const userData = await UserModel.findById(
							res.playlistOwner
						);
						const pLArray = userData.userPlaylists;
						const likedPlArray = userData.playlistLikes;

						const newPlArray = pLArray.filter(function (item) {
							return item != ID;
						});
						const newlikedPlArray = likedPlArray.filter(function (
							item
						) {
							return item != ID;
						});

						return UserModel.findByIdAndUpdate(
							res.playlistOwner,
							{
								$set: {
									userPlaylists: newPlArray,
									playlistLikes: newlikedPlArray,
								},
							},
							{ new: true }
						);
					}
				);
			},
		},

		addSong: {
			type: SongType,
			args: {
				songTitle: { type: GraphQLNonNull(GraphQLString) },

				songAlbum: { type: GraphQLID },
				songPlaycount: { type: GraphQLInt },
				songLikes: { type: GraphQLList(GraphQLID) },
				songGenre: { type: GraphQLID },
				songSrc: { type: GraphQLString },
				songLyric: { type: GraphQLString },
				songArtist: {
					type: GraphQLList(GraphQLID),
				},
			},
			resolve(parent, args) {
				const song = new SongModel({
					songTitle: args.songTitle,

					songAlbum: args.songAlbum,
					songPlaycount: args.songPlaycount,
					songLikes: args.songLikes,
					songGenre: args.songGenre,
					songSrc: args.songSrc,
					songLyric: args.songLyric,
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
				return SongModel.findByIdAndUpdate(
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
				const playlist = await PlaylistModel.findById(args.id);
				// console.log("plSongArr", playlist.albumSongs);
				const songsArr = playlist.songs;
				songsArr[songsArr.length] = args.songId;
				// console.log("songArr", songsArr);
				return PlaylistModel.findByIdAndUpdate(
					args.id,
					{
						$set: {
							songs: songsArr,
						},
					},
					{ new: true }
				);
			},
		},
		removeSongFromPlaylist: {
			type: PlaylistType,
			args: {
				id: { type: GraphQLNonNull(GraphQLID) },
				songId: { type: GraphQLID },
			},
			resolve: async (parent, args) => {
				const playlist = await PlaylistModel.findById(args.id);
				// console.log("plSongArr", playlist.albumSongs);
				const songsArr = playlist.songs;

				// console.log("songArr", songsArr);

				const newSongsArr = songsArr.filter(function (item) {
					return item != args.songId;
				});

				return PlaylistModel.findByIdAndUpdate(
					args.id,
					{
						$set: {
							songs: newSongsArr,
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

				const likedSongsArr = user.songs;
				likedSongsArr[likedSongsArr.length] = args.songId;

				return UserModel.findByIdAndUpdate(
					args.id,
					{
						$set: {
							songs: likedSongsArr,
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

				const likedSongsArr = user.songs;
				const newLikedSongsArr = likedSongsArr.filter(function (item) {
					return item != args.songId;
				});

				// console.log("AFTER", newLikedSongsArr);
				// console.log("BEFORE", user.songs);

				return UserModel.findByIdAndUpdate(
					args.id,
					{
						$set: {
							songs: newLikedSongsArr,
						},
					},
					{ new: true }
				);
			},
		},

		addLikedArtist: {
			type: UserType,
			args: {
				id: { type: GraphQLNonNull(GraphQLID) },
				artistId: { type: GraphQLID },
			},
			resolve: async (parent, args) => {
				const user = await UserModel.findById(args.id);

				const likedArtistsArr = user.artistLikes;
				likedArtistsArr[likedArtistsArr.length] = args.artistId;

				return UserModel.findByIdAndUpdate(
					args.id,
					{
						$set: {
							artistLikes: likedArtistsArr,
						},
					},
					{ new: true }
				).then(async (res) => {
					const ID = res.id;
					// console.log("response", res.id);
					const artistData = await ArtistModel.findById(
						args.artistId
					);

					const newArtistsLikedArray = artistData.artistLikes;
					newArtistsLikedArray[newArtistsLikedArray.length] = ID;
					// console.log("newPLArray", newPLArray);
					return ArtistModel.findByIdAndUpdate(
						args.artistId,
						{
							$set: {
								artistLikes: newArtistsLikedArray,
							},
						},
						{ new: true }
					);
				});
			},
		},

		removeLikedArtist: {
			type: UserType,
			args: {
				id: { type: GraphQLNonNull(GraphQLID) },
				artistId: { type: GraphQLID },
			},
			resolve: async (parent, args) => {
				const user = await UserModel.findById(args.id);

				const likedArtistsArr = user.artistLikes;
				const newLikedArtistsArr = likedArtistsArr.filter(function (
					item
				) {
					return item != args.artistId;
				});

				return UserModel.findByIdAndUpdate(
					args.id,
					{
						$set: {
							artistLikes: newLikedArtistsArr,
						},
					},
					{ new: true }
				).then(async (res) => {
					const ID = res.id;
					// console.log("response", res.id);
					const artistData = await ArtistModel.findById(
						args.artistId
					);

					const ArtistsLikedArray = artistData.artistLikes;
					const newLikedArtistsArr = ArtistsLikedArray.filter(
						function (item) {
							return item != args.id;
						}
					);
					return ArtistModel.findByIdAndUpdate(
						args.artistId,
						{
							$set: {
								artistLikes: newLikedArtistsArr,
							},
						},
						{ new: true }
					);
				});
			},
		},

		addLikedAlbum: {
			type: UserType,
			args: {
				id: { type: GraphQLNonNull(GraphQLID) },
				albumId: { type: GraphQLID },
			},
			resolve: async (parent, args) => {
				const user = await UserModel.findById(args.id);

				const likedAlbumsArr = user.albumLikes;
				likedAlbumsArr[likedAlbumsArr.length] = args.albumId;

				return UserModel.findByIdAndUpdate(
					args.id,
					{
						$set: {
							albumLikes: likedAlbumsArr,
						},
					},
					{ new: true }
				).then(async (res) => {
					const ID = res.id;
					// console.log("response", res.id);
					const albumData = await AlbumModel.findById(args.albumId);

					const newAlbumsLikedArray = albumData.albumLikes;
					newAlbumsLikedArray[newAlbumsLikedArray.length] = ID;
					// console.log("newPLArray", newPLArray);
					return AlbumModel.findByIdAndUpdate(
						args.albumId,
						{
							$set: {
								albumLikes: newAlbumsLikedArray,
							},
						},
						{ new: true }
					);
				});
			},
		},
		removeLikedAlbum: {
			type: UserType,
			args: {
				id: { type: GraphQLNonNull(GraphQLID) },
				albumId: { type: GraphQLID },
			},
			resolve: async (parent, args) => {
				const user = await UserModel.findById(args.id);

				const likedAlbumsArr = user.albumLikes;
				const newLikedAlbumsArr = likedAlbumsArr.filter(function (
					item
				) {
					return item != args.albumId;
				});

				return UserModel.findByIdAndUpdate(
					args.id,
					{
						$set: {
							albumLikes: newLikedAlbumsArr,
						},
					},
					{ new: true }
				).then(async (res) => {
					const ID = res.id;
					// console.log("response", res.id);
					const albumData = await AlbumModel.findById(args.albumId);

					const AlbumsLikedArray = albumData.albumLikes;
					const newLikedAlbumsArr = AlbumsLikedArray.filter(function (
						item
					) {
						return item != args.id;
					});
					return AlbumModel.findByIdAndUpdate(
						args.albumId,
						{
							$set: {
								albumLikes: newLikedAlbumsArr,
							},
						},
						{ new: true }
					);
				});
			},
		},
	},
});

export default mutation;
