import {
  graphql,
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema
} from 'graphql'

import {
  GraphQLDate
} from 'graphql-iso-date';
import {
  mongo
} from '../db'

export const policyType = new GraphQLObjectType({
  name: "Policy",
  fields: {
    policyId: {
      type: GraphQLID
    },
    policyNumber: {
      type: GraphQLString
    },
    contactNo: {
      type: GraphQLString
    },
    startDate: {
      type: GraphQLDate
    },
    productId: {
      type: GraphQLID
    }
  }
})

export const productType = new GraphQLObjectType({
  name: "Product",
  fields: {
    productId: {
      type: GraphQLID
    },
    productName: {
      type: GraphQLString
    },
    coverAmount: {
      type: GraphQLFloat
    },
    monthlyPremium: {
      type: GraphQLFloat
    },
    policies: {
      type: new GraphQLList(policyType),
      resolve: (_, args, context) => {
        return mongo
          .then(db => db.collection('policies').find().toArray())
      }
    }
  }
})
