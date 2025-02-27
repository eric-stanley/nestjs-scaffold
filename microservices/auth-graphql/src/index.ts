import { ApolloServer } from 'apollo-server';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const PORT = process.env.PORT || 3002;

server.listen(PORT).then(({ url }) => {
  console.log(`Auth GraphQL service running at ${url}`);
}); 