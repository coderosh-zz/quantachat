/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Resolver, Root, Subscription } from 'type-graphql';
import { MessageClass } from '../../entities/Message';
import { Context } from '../../Context';

const filterByMe = ({
  context,
  payload,
}: {
  context: Context;
  payload: any;
}) => {
  return (
    payload.to.equals(context.currentUser._id) ||
    payload.from.equals(context.currentUser._id)
  );
};

@Resolver()
class MessageSubResolver {
  @Subscription(() => MessageClass, {
    topics: 'NEW_MESSAGE',
    filter: filterByMe,
  })
  onNewMessage(@Root() message: any) {
    return message;
  }

  @Subscription(() => MessageClass, {
    topics: 'UPDATE_MESSAGE',
    filter: filterByMe,
  })
  onMessageUpdate(@Root() message: any) {
    return message;
  }

  @Subscription(() => MessageClass, {
    topics: 'DELETE_MESSAGE',
    filter: filterByMe,
  })
  onMessageDelete(@Root() message: any) {
    return message;
  }
}

export default MessageSubResolver;
