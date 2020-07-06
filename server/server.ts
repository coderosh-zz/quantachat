import 'colors';
import 'reflect-metadata';
import hpp from 'hpp';
import http from 'http';
import helmet from 'helmet';
import xss from 'xss-clean';
import express from 'express';
import passport from 'passport';
import session from 'express-session';
import { buildSchema } from 'type-graphql';
import mongoSanitize from 'express-mongo-sanitize';
import { createOnConnect } from 'graphql-passport';
import connectMongo from 'connect-mongodb-session';
import { ApolloServer } from 'apollo-server-express';

import './config/passport';
import { connectDatabase } from './config/db';
import Resolvers from './resolvers/Resolvers';
import authRouter from './routes/auth';
import isAuth from './utils/isAuth';
import contextFn, { pubsub } from './Context';

const MongoStore = connectMongo(session);
const sessionMiddleware = session({
  store: new MongoStore({
    uri: process.env.MONGO_URI as string,
    collection: 'sessions',
    expires: 1000 * 60 * 60 * 24 * 7,
  }),
  secret: process.env.SESSION_SECRET as string,
  name: 'sid',
  saveUninitialized: false,
  resave: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
});

const passportMiddleware = passport.initialize();
const passportSessionMiddleware = passport.session();

const app = express();

app.use(xss());
app.use(hpp());
app.use(helmet());
app.use(mongoSanitize());
app.use(sessionMiddleware);
app.use(passportMiddleware);
app.use(passportSessionMiddleware);

app.use('/auth', authRouter);

(async () => {
  const schema = await buildSchema({
    resolvers: Resolvers as any,
    authChecker: isAuth,
    pubSub: pubsub,
    emitSchemaFile: {
      path: './server/graphql/schema.gql',
    },
  });

  const server = new ApolloServer({
    schema,
    context: contextFn,
    subscriptions: {
      path: '/subscriptions',
      onConnect: createOnConnect([
        sessionMiddleware as any,
        passportMiddleware,
        passportSessionMiddleware,
      ]) as any,
    },
    playground: {
      settings: {
        'request.credentials': 'include',
      },
    },
  });

  server.applyMiddleware({ app });
  const httpServer = http.createServer(app);
  server.installSubscriptionHandlers(httpServer);

  await connectDatabase();

  const PORT = process.env.PORT || 4000;
  httpServer.listen(PORT, () => {
    console.log(` Server is listening on port ${PORT} `.bgGreen.black);
  });
})();
