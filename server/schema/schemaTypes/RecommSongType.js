import { GraphQLObjectType, GraphQLID, GraphQLList } from "graphql";

import SongType from "./SongType.js";

const RecommSongType = new GraphQLObjectType({
	name: "RecommSong",
	fields: () => ({
		id: { type: GraphQLID },
		recommSongs: {
			type: GraphQLList(SongType),
		},
	}),
});

export default RecommSongType;
