const { ApolloServer, gql } = require('apollo-server');
const TodoAPI = require('./datasources/todo-api');

const typeDefs = gql`
  type Todo {
    id: ID!
    userId: Int!
    title: String!
    completed: Boolean!
  }

  type Query {
    getTodo: [Todo!]!
    getTodoByUser: [Todo!]!
  }
`;

const resolvers = {
  Query: {
    getTodo: (_, __, { dataSources }) => {
      return dataSources.getTodoResolver.getTodoAll();
    },
    getTodoByUser: (_, __, { dataSources }) => {
      return dataSources.getTodoResolver.getTodoByUser(userId);
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      getTodoResolver: new TodoAPI(),
    };
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
