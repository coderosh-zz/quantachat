import 'reflect-metadata';
import 'colors';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema, Query, Resolver } from 'type-graphql';
import { connectDatabase } from './config/db';

@Resolver()
class HelloResolver {
  @Query(() => String)
  hello(): string {
    return 'Hello World';
  }
}

(async () => {
  const app = express();
  const schema = await buildSchema({
    resolvers: [HelloResolver],
  });

  const server = new ApolloServer({ schema });

  server.applyMiddleware({ app });

  await connectDatabase();

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(` Server is listening on port ${PORT} `.bgGreen.black);
  });
})();
