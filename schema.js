// import {
//   graphql,
//   graphqlId,
//   graphqlObjectType,
//   graphqlString,
//   graphQLNonNull,
//   graphqlFloat,
//   graphqlInt,
//   graphqlDate,
//   graphqlList
// } from 'graphql'

var graphql = require('graphql');

//Dummy data
var Products = [{
  productId: 124545897,
  productName: "life insurance",
  coverAmount: 50.000,
  monthlyPremium: 215.00
},
{
  productId: 124545897,
  productName: "car insurance",
  coverAmount: 50.000,
  monthlyPremium: 215.00
}]
var Policies = [{
  policyId: 3421578989,
  policyNumber: 1020,
  contactNo: "0211024555",
  startDate: "2017-06-02T09:40:15.090Z"
},
{policyId: 123456778,
policyNumber: 1030,
contactNo: "011100020000",
startDate: "20/05/2015"
}]

// graphql types
var policyType = new graphql.GraphQLObjectType({
  name: "policy",
  fields: function(){
    return {
      policyId: {
        type: graphql.GraphQLID
      },
      policyNumber:{
        type: graphql.GraphQLInt
      },
      contactNo: {
        type: graphql.GraphQLString
      },
      startDate:{
        type: graphql.GraphQLString
      }
    }
  }
})

var productType = new graphql.GraphQLObjectType({
  name: "product",
  fields: function(){
    return {
      productId: {
        type: graphql.GraphQLID
      },
      productName :{
        type:graphql.GraphQLString
      },
      coverAmount: {
        type: graphql.GraphQLFloat
      },
      monthlyPremium: {
        type: graphql.GraphQLFloat
      },
      policies: {
        type: new graphql.GraphQLList(policyType),
        resolve: function () {
          return Policies;
        }
      }
    }
  }
})


var getProducts = {
  type: new graphql.GraphQLList(productType),
  resolve: function () {
    return Products;
  }
}
var addProduct = new graphql.inputObjectType({
  type: productType,
  description: 'Add a new product',
  args: {
    productName: {
      name: 'Product name',
      type: new graphql.GraphQLNonNull(graphql.GraphQLString)
    },
    coverAmount: {
      name: 'Cover Amount',
      type: new graphql.GraphQLNonNull(graphql.GraphQLFloat)
    },
    monthlyPremium: {
      name: 'Monthly Premium',
      type: new graphql.GraphQLNonNull(graphql.GraphQLFloat)
    },
    policies: {
      name: 'Policies',
      type: new graphql.GraphQLList(policyType),
      resolve: function () {
        return Policies;
      }
    }
  },
resolve: (root,args) => {
  var newProduct = new PRODUCT({
    productName: "Disability cover",
    coverAmount: 20000,
    monthlyPremium: 1000,
    policies: args.policies
  })
  Products.push(newProduct);
}
})





var QueryType = new graphql.GraphQLObjectType({
  name: "Query",
  description: 'contains all queries',
  fields:{
    products: getProducts,
  }
})
var MutationType = new graphql.GraphQLObjectType({
  name: 'Mutation',
  description: 'contains all mutations',
  fields: {
    add: addProduct
  }
});
module.exports = new graphql.GraphQLSchema({
  query: QueryType,
  mutation: MutationType
});
