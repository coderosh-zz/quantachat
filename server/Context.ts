import { Request, Response } from 'express';
import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';
import { ApolloError, PubSub } from 'apollo-server-express';
import { buildContext, PassportContext } from 'graphql-passport';
import { UserClass } from './entities/User';
import { ObjectID } from 'mongodb';

interface ICurrentUser extends UserClass {
  id: ObjectID;
}

interface IContextRequest extends Request {
  logout: () => void;
}

export interface Context
  extends PassportContext<UserClass, any, any, IContextRequest> {
  pubsub: PubSub;
  res: Response;
  currentUser: ICurrentUser;
}

export const pubsub = new PubSub();

const contextFn = ({ req, res, connection }: ExpressContext): Context => {
  let context = connection && connection.context;
  let currentUser = connection && connection.context.req.user;

  if (!context) context = buildContext({ req, res });
  if (!currentUser) {
    currentUser = context.getUser();
  }

  try {
    return {
      ...context,
      pubsub,
      currentUser,
    };
  } catch (err) {
    throw new ApolloError(err);
  }
};

export default contextFn;
