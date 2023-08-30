import {
	GraphQLObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLList,
} from "graphql";
import AlbumType from "./AlbumType.js";
import CommentArtistType from "./CommentArtistType.js";
import AlbumModel from "../../models/Album.js";
import UserType from "./UserType.js";
import UserModel from "../../models/User.js";
import SongType from "./SongType.js";

const ArtistType = new GraphQLObjectType({
	name: "Artist",
	fields: () => ({
		id: { type: GraphQLID },
		artistName: { type: GraphQLString },
		artistPhoto: { type: GraphQLString },
		artistBackground: { type: GraphQLString },
		artistInfos: { type: GraphQLString },
		artistAlbums: {
			type: GraphQLList(AlbumType),
			resolve: async (parent, args) => {
				// console.log("====>", parent.artistAlbums);
				const res = await parent.artistAlbums.map((album) => {
					return AlbumModel.findById(album.id).populate([
						"albumGenre",
						"albumArtist",
						"songs",
					]);
				});

				return res;
			},
		},
		artistLikes: {
			type: GraphQLList(UserType),
			resolve: async (parent, args) => {
				// console.log("====>", parent);
				const res = await parent.artistLikes.map((user) => {
					return UserModel.findById(user);
				});

				return res;
			},
		},
		// artistPopularTracks: { type: GraphQLList(SongType) },
		artistComments: { type: GraphQLList(CommentArtistType) },
	}),
});

export default ArtistType;
