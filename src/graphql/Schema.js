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
} from 'graphql';

import {ObjectId} from 'mongodb'
import {GraphQLDate} from 'graphql-iso-date';
import {productType} from './types'
import {policyType} from './types'
import {mongo} from '../db'


// policy input type
const policyInputType = new GraphQLInputObjectType({
  name: 'policyInput',
  fields: {
    contactNo: {type: GraphQLString},
    startDate: {type: GraphQLDate}
  },
})
const addPolicyMutation = {
  type: policyType,
  args: {
    contactNo: {type: GraphQLString},
    startDate: {type: GraphQLDate},
    productId: {type: GraphQLID}
},
  resolve: (_, args, policyId) => {
    const newPolicy = {
      contactNo: args.contactNo,
      startDate: args.startDate,
      productId: args.productId
    }
    return mongo
      .then(db => db.collection('products').findOne({_id: ObjectId(args.productId)}))
      .then((result) =>{
        if(result){
          return mongo
        .then(db => db.collection('policies').insert(newPolicy))
          .then(() => newPolicy)
      }else {
        throw new Error("product not found")
      }

})
     }
  }

const updatePolicyMutation = {
  type: policyType,
  args: {
    _id: {type: GraphQLID},
    input: {type: policyInputType}
  },
  resolve: (_, args) => {
    return mongo
      .then(db => db.collection('policies').findAndModify({_id: ObjectId(args._id)}, [],
       {$set: args.input}, {new: true}))

      .then(result => result.value)
      .catch(err => err)

  }
}

// addding new product
const addProductMutation = {
  type: productType,
  args: {productName: {type: GraphQLString},
    coverAmount: {type: GraphQLFloat},
    monthlyPremium: {type: GraphQLFloat},

  },
  resolve: (_, args, session) => {
    const newProduct = {
      productName: args.productName,
      coverAmount: args.coverAmount,
      monthlyPremium: args.monthlyPremium,
      policies: args.policies
    }
    return mongo
      .then(db => db.collection('products').insert(newProduct))
      .then(() => newProduct)
  }

}

//products query:describes list of productType and contains resolver to fetch products
const productQuery = {
  type: new
  GraphQLList(productType),
  resolve: (_, args, context) => {
    return mongo
      .then(db => db.collection('products').find().toArray())
  }
}
// fetching policies
const policyQuery = {
  type: new
  GraphQLList(policyType),
  resolve: (_, args, context) => {
    return mongo
      .then(db => db.collection('policies').find().toArray())
  }
}
// grouping all queries
const QueryType = new GraphQLObjectType({
  name: "Query",
  description: "contains all queries",
  fields: {
    products: productQuery,
    policies: policyQuery
  }
})
// grouping all mutations
const MutationType = new GraphQLObjectType({
  name: "mutation",
  description: "contains all mutations",
  fields: {
    addProduct: addProductMutation,
    addPolicy: addPolicyMutation,
    updatePolicy: updatePolicyMutation
  }
})
const schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType
})
export default schema
