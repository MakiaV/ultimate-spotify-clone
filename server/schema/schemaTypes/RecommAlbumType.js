import { GraphQLObjectType, GraphQLID, GraphQLList } from "graphql";

import AlbumType from "./AlbumType.js";

const RecommAlbumType = new GraphQLObjectType({
	name: "RecommAlbum",
	fields: () => ({
		id: { type: GraphQLID },
		recommAlbums: {
			type: GraphQLList(AlbumType),
		},
	}),
});

export default RecommAlbumType;
