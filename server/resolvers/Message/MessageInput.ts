import { InputType, Field } from 'type-graphql';
import { UserShouldExist } from '../Validators/UserShouldExist';

@InputType()
class MessageInput {
  @Field()
  text!: string;

  @Field()
  @UserShouldExist({ message: 'User not found' })
  to!: string;
}

export default MessageInput;
