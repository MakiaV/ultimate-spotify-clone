import {
	GraphQLObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLList,
	GraphQLInt,
	GraphQLScalarType,
	Kind,
} from "graphql";
import UserModel from "../../models/User.js";

import UserType from "./UserType.js";

const CommentAlbumType = new GraphQLObjectType({
	name: "CommentAlbum",
	fields: () => ({
		id: { type: GraphQLID },
		albumID: { type: GraphQLID },
		createdAt: {
			type: new GraphQLScalarType({
				name: "Date",
				description: "Date custom scalar type",
				serialize(value) {
					return value.getTime(); // Convert outgoing Date to integer for JSON
				},
				parseValue(value) {
					return new Date(value); // Convert incoming integer to Date
				},
				parseLiteral(ast) {
					if (ast.kind === Kind.INT) {
						// Convert hard-coded AST string to integer and then to Date
						return new Date(parseInt(ast.value, 10));
					}
					// Invalid hard-coded value (not an integer)
					return null;
				},
			}),
		},
		commentText: { type: GraphQLString },
		commentUser: {
			type: UserType,
			resolve: async (parent, args) => {
				return UserModel.findById(parent.commentUser);
			},
		},
		commentLikes: {
			type: GraphQLList(UserType),
			resolve: async (parent, args) => {
				const lkr = await parent.commentLikes.map((liker) => {
					return UserModel.findById(liker);
				});
				return lkr;
			},
		},
		timestamps: { type: GraphQLInt },
	}),
});

export default CommentAlbumType;
