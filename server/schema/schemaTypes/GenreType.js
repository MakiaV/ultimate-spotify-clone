const { GraphQLObjectType, GraphQLID, GraphQLString } = require("graphql");

const GenreType = new GraphQLObjectType({
	name: "Genre",
	fields: () => ({
		id: { type: GraphQLID },
		genreName: { type: GraphQLString },
		genreInfos: { type: GraphQLString },
	}),
});

module.exports = GenreType;
