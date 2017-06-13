import {
  graphql,
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLFloat,
  GraphQLInt,
  GraphQLDate,
  GraphQLList,
  GraphQLSchema
} from 'graphql'


export const policyType = new GraphQLObjectType({
  name: "Policy",
  fields:{
    policyId: {type: GraphQLID},
    policyNumber: {type: GraphQLString},
    contactNo: {type:GraphQLString},
    startDate: {type: GraphQLString}
  }
})

export const productType = new GraphQLObjectType({
  name: "Product",
  fields:{
    productId:{type: GraphQLID},
    productName:{type:GraphQLString},
    coverAmount: {type:GraphQLFloat},
    monthlyPremium:{type:GraphQLFloat},
    policies:{type:new GraphQLList(policyType)}
  }
})
