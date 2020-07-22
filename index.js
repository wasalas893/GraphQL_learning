const {ApolloServer,gql}=require('apollo-server');

const typeDefs=gql`
   type Query{
       hello:String
       user:User
   }
   type User{
     id:ID!
     username:String!
   }
   type Error{
       field:String!
       message:String!
   }
   type RegisterResponse{
       errors:[Error]
       user:User
   }
   input UserInfo{
    username:String!,password:String!, age:Int
   }

   type Mutation{
       register(userInfo:UserInfo!):RegisterResponse!
   }

`;

const resolvers={
    Query:{
        hello:()=>null,
        user:()=>({
            id:1,
            username:"sunnada"
        })
    },
    Mutation:{
        register:()=>({
            errors:[
                {
                    field:"username",
                    message:"badname"
                },
                {
                    field:"username1",
                    message:"badname1"
                }
            ],
            user:{
                id:1,
                username:"sunnada"
            }
        })
    }
};



const server=new ApolloServer({typeDefs,resolvers});

server.listen().then(({url})=>console.log(`server started at ${url}`));



