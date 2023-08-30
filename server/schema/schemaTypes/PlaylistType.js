import {
	GraphQLObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLInt,
	GraphQLList,
	GraphQLBoolean,
} from "graphql";
import UserModel from "../../models/User.js";
import UserType from "./UserType.js";
import ArtistType from "./ArtistType.js";
import SongType from "./SongType.js";
import ArtistModel from "../../models/Artist.js";
import SongModel from "../../models/Song.js";

const PlaylistType = new GraphQLObjectType({
	name: "Playlist",
	fields: () => ({
		id: { type: GraphQLID },
		playlistName: { type: GraphQLString },
		playlistDescription: { type: GraphQLString },

		playlistOwner: {
			type: UserType,
			resolve: async (parent, args) => {
				const res = await UserModel.findById(parent.playlistOwner);

				return res;
			},
		},
		playlistArtwork: { type: GraphQLString },
		isUserPlaylist: { type: GraphQLBoolean },
		playlistLikes: { type: GraphQLList(UserType) },
		playlistArtists: {
			type: GraphQLList(ArtistType),
			resolve: async (parent, args) => {
				const art = await parent.playlistArtists.map((artist) => {
					return ArtistModel.findById(artist);
				});
				return art;
			},
		},

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

export default PlaylistType;
