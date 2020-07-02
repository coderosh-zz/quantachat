/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Resolver, Query, Mutation, FieldResolver, Root } from 'type-graphql';
import Message, { MessageClass } from '../../entities/Message';
import User, { UserClass } from '../../entities/User';

@Resolver(() => MessageClass)
class MessageResolver {
  @Query(() => [MessageClass])
  async messages(): Promise<MessageClass[]> {
    return await Message.find({});
  }

  @Mutation(() => MessageClass)
  async createNewMessage(): Promise<MessageClass> {
    const message = new Message({
      from: '5efc98440984272e14781993',
      to: '5efd3d00595f6515c8142d36',
      text: 'Hello',
    });
    await message.save();
    return message;
  }

  @FieldResolver(() => UserClass)
  async from(@Root() parent: any): Promise<UserClass | null> {
    return await User.findById(parent.from);
  }

  @FieldResolver(() => UserClass)
  async to(@Root() parent: any): Promise<UserClass | null> {
    return await User.findById(parent.to);
  }
}

export default MessageResolver;
