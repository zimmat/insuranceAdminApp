import {
  graphql,
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
  GraphQLInputObjectType
} from 'graphql'
import {ObjectId} from 'mongodb'
import {GraphQLDate} from 'graphql-iso-date';
import {mongo} from '../db'


export const policyType = new GraphQLObjectType({
  name: "Policy",
  fields: {
    _id:{type:GraphQLID},
    contactNo: {type: GraphQLString},
    startDate: {type: GraphQLDate},
    productId: {type: GraphQLID}
  }
})

export const productType = new GraphQLObjectType({
  name: "Product",
  fields: {
    _id:{type: GraphQLID},
    productName: {type: GraphQLString},
    coverAmount: {type: GraphQLFloat},
    monthlyPremium: {type: GraphQLFloat},
    policies:{
      type: new GraphQLList(policyType),
      resolve:(_) =>{
        return mongo
        .then(db=>db.collection('policies').find({productId:(_._id).toString()}).toArray())

      }
    }
  }
})
