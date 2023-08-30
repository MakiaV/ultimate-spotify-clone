import {
	GraphQLObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLList,
} from "graphql";

import UserType from "./UserType.js";

const CommentPlaylistType = new GraphQLObjectType({
	name: "CommentPlaylist",
	fields: () => ({
		id: { type: GraphQLID },
		commentText: { type: GraphQLString },
		commentUser: { type: GraphQLList(UserType) },
	}),
});

export default CommentPlaylistType;
