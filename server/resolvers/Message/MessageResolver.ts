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
    const loggedInUser = context.getUser()!;
    const message = new Message({ from: loggedInUser._id, to, text });
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
    const updatedMessage = await Message.findById(id);
    if (!updatedMessage) throw new ApolloError('Message not found');

    const user = context.getUser()!;
    if (!user._id.equals(updatedMessage.from as any))
      throw new ApolloError('You are not authorized to edit this message');

    updatedMessage.text = text;
    await updatedMessage.save();

    return updatedMessage;
  }

  @Authorized()
  @Mutation(() => Boolean)
  async deleteMessage(
    @Ctx() context: Context,
    @Arg('id') id: string
  ): Promise<boolean> {
    const message = await Message.findById(id);
    if (!message) throw new ApolloError('Message not found');

    const user = context.getUser()!;

    if (!user._id.equals(message.from as any))
      throw new ApolloError('You are not authorized to edit this message');

    await Message.findByIdAndDelete(id);
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
