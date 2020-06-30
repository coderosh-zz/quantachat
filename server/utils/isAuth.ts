import { AuthChecker } from 'type-graphql';
import { AuthenticationError } from 'apollo-server-express';
import { Context } from '../Context';

const useAuth: AuthChecker<Context> = ({ context }) => {
  if (!context.getUser()) {
    throw new AuthenticationError('User not authenticated');
  }
  return true;
};
export default useAuth;
