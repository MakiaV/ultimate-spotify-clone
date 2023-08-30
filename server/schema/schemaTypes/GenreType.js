import { GraphQLObjectType, GraphQLID, GraphQLString } from "graphql";

const GenreType = new GraphQLObjectType({
	name: "Genre",
	fields: () => ({
		id: { type: GraphQLID },
		genreName: { type: GraphQLString },
		genreInfos: { type: GraphQLString },
		genreImg: { type: GraphQLString },
		genreBannerImg: { type: GraphQLString },
		genreBannerPosition: { type: GraphQLString },
	}),
});

export default GenreType;
