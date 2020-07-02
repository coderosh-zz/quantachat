import { Resolver, Query } from 'type-graphql';
import Message, { MessageClass } from '../../entities/Message';

@Resolver(() => MessageClass)
class MessageResolver {
  @Query(() => [MessageClass])
  async messages(): Promise<MessageClass[]> {
    return await Message.find({});
  }
}

export default MessageResolver;
