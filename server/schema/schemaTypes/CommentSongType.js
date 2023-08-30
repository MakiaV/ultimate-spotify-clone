import {
	GraphQLObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLList,
} from "graphql";

import UserType from "./UserType.js";

const CommentSongType = new GraphQLObjectType({
	name: "CommentSong",
	fields: () => ({
		id: { type: GraphQLID },
		commentText: { type: GraphQLString },
		commentUser: { type: GraphQLList(UserType) },
	}),
});

export default CommentSongType;
