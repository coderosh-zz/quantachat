/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  Resolver,
  Query,
  Mutation,
  FieldResolver,
  Root,
  Arg,
  Ctx,
  Authorized,
} from 'type-graphql';
import Message, { MessageClass } from '../../entities/Message';
import User, { UserClass } from '../../entities/User';
import MessageInput from './MessageInput';
import { Context } from '../../Context';
import { ApolloError } from 'apollo-server-express';

@Resolver(() => MessageClass)
class MessageResolver {
  @Query(() => [MessageClass])
  async messages(): Promise<MessageClass[]> {
    return await Message.find({});
  }

  @Authorized()
  @Query(() => [MessageClass])
  async getMessage(
    @Arg('to') to: string,
    @Ctx() context: Context
  ): Promise<MessageClass[]> {
    return Message.find({ to, from: context.getUser()!._id });
  }

  @Authorized()
  @Mutation(() => MessageClass)
  async createNewMessage(
    @Arg('data') { to, text }: MessageInput,
    @Ctx() context: Context
  ): Promise<MessageClass> {
    const message = new Message({ from: context.currentUser._id, to, text });
    await message.save();
    return message;
  }

  @Authorized()
  @Mutation(() => MessageClass)
  async updateMessage(
    @Arg('id') id: string,
    @Arg('text') text: string,
    @Ctx() context: Context
  ): Promise<MessageClass> {
    const updatedMessage = await Message.findOneAndUpdate(
      { _id: id, from: context.currentUser._id },
      { text },
      { new: true }
    );
    if (!updatedMessage) throw new ApolloError('Message not found');

    return updatedMessage;
  }

  @Authorized()
  @Mutation(() => Boolean)
  async deleteMessage(
    @Ctx() context: Context,
    @Arg('id') id: string
  ): Promise<boolean> {
    const message = await Message.findOneAndDelete({
      _id: id,
      from: context.currentUser._id,
    });
    if (!message) throw new ApolloError('Message not found');

    return true;
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
