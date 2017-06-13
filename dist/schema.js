'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mongo = undefined;

var _graphql = require('graphql');

var _mongodb = require('mongodb');

const MONGO_URL = 'mongodb://localhost:27017/insuranceadmin';
const mongo = exports.mongo = _mongodb.MongoClient.connect(MONGO_URL

//Dummy data
);const Products = [{
  productId: 124545897,
  productName: 'life insurance',
  coverAmount: 50.000,
  monthlyPremium: 215.00
}, {
  productId: 124545897,
  productName: 'car insurance',
  coverAmount: 50.000,
  monthlyPremium: 215.00
}];
const Policies = [{
  policyId: 3421578989,
  policyNumber: 1020,
  contactNo: '0211024555',
  startDate: '2017-06-02T09:40:15.090'
}, { policyId: 123456778,
  policyNumber: 1030,
  contactNo: '011100020000',
  startDate: '20/05/2015'
}];

// graphql types
const policyType = new _graphql.GraphQLObjectType({
  name: 'policy',
  fields: function fields() {
    return {
      policyId: {
        type: _graphql.GraphQLID
      },
      policyNumber: {
        type: _graphql.GraphQLInt
      },
      contactNo: {
        type: _graphql.GraphQLString
      },
      startDate: {
        type: _graphql.GraphQLString
      }
    };
  }
});

const productType = new _graphql.GraphQLObjectType({
  name: 'product',
  fields: function fields() {
    return {
      productId: {
        type: _graphql.GraphQLID
      },
      productName: {
        type: _graphql.GraphQLString
      },
      coverAmount: {
        type: _graphql.GraphQLFloat
      },
      monthlyPremium: {
        type: _graphql.GraphQLFloat
      },
      policies: {
        type: new _graphql.GraphQLList(policyType),
        resolve: function resolve() {
          return Policies;
        }
      }
    };
  }
});

const getProducts = {
  type: new _graphql.GraphQLList(productType),
  resolve: function resolve() {
    return Products;
  }
};
const addProduct = {
  type: productType,
  description: 'Add a new product',
  args: {
    productName: {
      name: 'Product name',
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
    },
    coverAmount: {
      name: 'Cover Amount',
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLFloat)
    },
    monthlyPremium: {
      name: 'Monthly Premium',
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLFloat)
    },
    policies: {
      name: 'Policies',
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
    }
  },
  resolve: (root, args) => {
    const newProduct = new PRODUCT({
      productName: 'Disability cover',
      coverAmount: 20000,
      monthlyPremium: 1000,
      policies: [{
        policyId: 3421578989,
        policyNumber: 1020,
        contactNo: '0211024555',
        startDate: '2017-06-02T09:40:15.090Z'
      }, { policyId: 123456778,
        policyNumber: 1030,
        contactNo: '011100020000',
        startDate: '20/05/2015'
      }]
    });
    Products.push(newProduct);
  }
};

const QueryType = new _graphql.GraphQLObjectType({
  name: 'Query',
  description: 'contains all queries',
  fields: {
    products: getProducts
  }
});
const MutationType = new _graphql.GraphQLObjectType({
  name: 'Mutation',
  description: 'contains all mutations',
  fields: {
    add: addProduct
  }
});
module.exports = new _graphql.GraphQLSchema({
  query: QueryType,
  mutation: MutationType
});
//# sourceMappingURL=schema.js.map