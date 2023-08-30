import {
	GraphQLObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLInt,
} from "graphql";

const PayType = new GraphQLObjectType({
	name: "Pay",
	fields: () => ({
		id: { type: GraphQLID },
		amount: { type: GraphQLString },
		payerName: { type: GraphQLString },
		payerNumber: { type: GraphQLString },
	}),
});

export default PayType;
