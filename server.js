var graphql = require ('graphql').graphql
var express = require('express')
var graphQLHTTP = require('express-graphql')
var Schema = require('./schema')
var query = `
query {
  products {
    productId,
    productName,
    coverAmount,
    monthlyPremium,
    policies {
      policyId
    }
  }
}
`


graphql(Schema, query).then( function(result) {
  console.log(JSON.stringify(result));
});
  var app = express()
  .use('/', graphQLHTTP({ schema: Schema, pretty: true }))
  .listen(3000, function (err) {
    console.log('GraphQL Server is now running on localhost:3000');
  });
