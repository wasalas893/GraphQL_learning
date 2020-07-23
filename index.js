const {ApolloServer,gql}=require('apollo-server');

const typeDefs=gql`
   type Query{
       hello(name:String):String
       user:User
   }
   type User{
     id:ID!
     username:String!
     firstLatter:String!
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
       login(userInfo:UserInfo!):String!
   }

`;

const resolvers={
    User:{
        firstLatter:parent=>{
            return parent.username[0];
        }
    },
    Query:{
        hello:(parent,{name})=>{
            return `name is ${name}`
        }
        ,
        user:()=>({
            id:1,
            username:"sunnada bad name "
        })
    },
    Mutation:{
        
        login:(parent,{userInfo:{username}},context,info)=>{
            console.log(context)
            return username
        },
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
                username:"sunnada good name"
            }
        })
    }
};



const server=new ApolloServer({typeDefs,resolvers,context:({req,res})=>({req,res})});

server.listen().then(({url})=>console.log(`server started at ${url}`));



