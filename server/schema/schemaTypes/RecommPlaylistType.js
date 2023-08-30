import { GraphQLObjectType, GraphQLID, GraphQLList } from "graphql";

import PlaylistType from "./PlaylistType.js";

const RecommPlaylistType = new GraphQLObjectType({
	name: "RecommPlaylist",
	fields: () => ({
		id: { type: GraphQLID },
		recommPlaylists: {
			type: GraphQLList(PlaylistType),
		},
	}),
});

export default RecommPlaylistType;
