import { GraphQLObjectType, GraphQLID, GraphQLList } from "graphql";

import AlbumType from "./AlbumType.js";

const NewAlbumType = new GraphQLObjectType({
	name: "NewAlbum",
	fields: () => ({
		id: { type: GraphQLID },
		newAlbums: {
			type: GraphQLList(AlbumType),
		},
	}),
});

export default NewAlbumType;
