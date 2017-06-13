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
  GraphQLSchema,
  GraphQLInputObjectType
} from 'graphql'
import {productType} from './types'
import {policyType} from './types'
import { mongo } from '../db'

//Dummy data
const Products = [{
  productId: 124545897,
  productName: 'life insurance',
  coverAmount: 50.000,
  monthlyPremium: 215.00
},
{
  productId: 124545897,
  productName: 'car insurance',
  coverAmount: 50.000,
  monthlyPremium: 215.00
}]
const Policies = [{
  policyId: 3421578989,
  policyNumber: 1020,
  contactNo: '0211024555',
  startDate: '2017-06-02T09:40:15.090'
},
{policyId: 123456778,
policyNumber: 1030,
contactNo: '011100020000',
startDate: '20/05/2015'
}]

// policy input type
const inputType = new GraphQLInputObjectType({
  name: 'policyInput',
  fields: {
    policyId: {type: GraphQLID},
    policyNumber: {type: GraphQLString},
    contactNo: {type:GraphQLString},
    startDate: {type: GraphQLString}
  },

})
const addPolicyMutation = {
  type: policyType,
  args:{
    policyId: {type: GraphQLID},
    policyNumber: {type: GraphQLString},
    contactNo: {type:GraphQLString},
    startDate: {type: GraphQLString}
  },
  resolve:(_,args,session) =>{
  const newPolicy= {
    policyId: args.policyId,
    policyNumber: args.policyNumber,
    contactNo: args.contactNo,
    startDate: args.startDate
  }
  return mongo
  .then(db => db.collection('policies').insert(newPolicy))
  .then(()=> newPolicy)
}
}
// addding new product
const addProductMutation = {
  type: productType,
  args: {
    productId:{type: GraphQLID},
    productName:{type:GraphQLString},
    coverAmount: {type:GraphQLFloat},
    monthlyPremium:{type:GraphQLFloat},
    policies:{type: new GraphQLList(inputType)}
  },
  resolve: (_, args, session) => {
    const newProduct ={
    productName: args.productName,
    coverAmount: args.coverAmount,
    monthlyPremium: args.monthlyPremium,
    policies: args.policies
  }
    return mongo
    .then(db => db.collection('products').insert(newProduct))
    .then(()=> newProduct)
  }

}
//products query:describes list of productType and contains resolver to fetch products
const productQuery = {
  type: new
  GraphQLList(productType),
  resolve: (_,args,context)=>{
    return mongo
     .then(db => db.collection('products').find().toArray())
  }

  }
  // fetching policies
  const policyQuery = {
    type: new
    GraphQLList(policyType),
    resolve: (_,args,context) =>{
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
    addPolicy: addPolicyMutation
  }
})
const schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType
})
export default schema
