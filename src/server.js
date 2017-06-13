import express from 'express'
import session from 'express-session'
import graphqlHTTP from 'express-graphql'

import schema from './graphql/schema'

const app = express();
// setup session
app.use(session({
secret: 'anything',
cookie: {maxAge: 6000},
saveUninitialized:true,
resave: true
}))
//setting up api root
app.use('/api',
graphqlHTTP(req =>({
  schema: schema,
  context: req.session,
  pretty:true,
  graphiql:true,
  formatError:error =>({
    message:error.message,
    stack:error.stack
  })
})))
//showing api data on the browser
app.get('/', (req,res) =>{
  res.send("send api info");
});

app.listen(3000,() =>{
  console.log("app is running in port 3000");
})
