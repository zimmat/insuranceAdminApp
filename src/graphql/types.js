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
    policies:{type:new GraphQLList(policyType),
      resolve: (_,args,context) =>{
        return Policies
    }
  }
}
})
