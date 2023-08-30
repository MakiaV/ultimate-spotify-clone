import { GraphQLObjectType, GraphQLID, GraphQLList } from "graphql";

import ArtistType from "./ArtistType.js";

const RecommArtistType = new GraphQLObjectType({
	name: "RecommArtist",
	fields: () => ({
		id: { type: GraphQLID },
		recommArtists: {
			type: GraphQLList(ArtistType),
		},
	}),
});

export default RecommArtistType;
