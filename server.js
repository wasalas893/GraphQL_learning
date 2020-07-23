const {ApolloServer}=require('apollo-server');
const gql=require('graphql-tag');

const mongoose=require('mongoose');

const { MONGODB }=require('./config');

const typeDefs=gql`
      type Query{
          name:String!
      }

`;

const resolvers={
      Query:{
          name:()=>'hello sunnada good name!'
      }
   
        
       
};



const server=new ApolloServer({typeDefs,resolvers});
//database connect

mongoose
      .connect(MONGODB,{
          useNewUrlParser:true,
          useUnifiedTopology: true
        })
      .then(()=>{
          console.log('mongodb connected.....')
          return server.listen()
      })
      .then(({url})=>console.log(`server started at ${url}`))



