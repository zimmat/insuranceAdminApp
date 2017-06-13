'use strict';

var _graphql = require('graphql');

var _Schema = require('./Schema');

var _Schema2 = _interopRequireDefault(_Schema);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressGraphql = require('express-graphql');

var _expressGraphql2 = _interopRequireDefault(_expressGraphql);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// var graphql = require ('graphql').graphql
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
`;

(0, _graphql.graphql)(_Schema2.default, query).then(function (result) {
  console.log(JSON.stringify(result));
});
let app = (0, _express2.default)().use('/', (0, _expressGraphql2.default)({ schema: _Schema2.default, pretty: true })).listen(3000, function (err) {
  console.log('GraphQL Server is now running on localhost:3000');
});
//# sourceMappingURL=server.js.map