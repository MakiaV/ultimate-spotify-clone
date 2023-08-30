import {
	GraphQLObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLList,
} from "graphql";

import UserType from "./UserType.js";

const CommentArtistType = new GraphQLObjectType({
	name: "CommentArtist",
	fields: () => ({
		id: { type: GraphQLID },
		commentText: { type: GraphQLString },
		commentUser: { type: GraphQLList(UserType) },
	}),
});

export default CommentArtistType;
