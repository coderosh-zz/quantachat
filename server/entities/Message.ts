import {
  getModelForClass,
  prop,
  modelOptions,
  Ref,
} from '@typegoose/typegoose';
import { ObjectID } from 'mongodb';
import { Field, ID, ObjectType } from 'type-graphql';
import { UserClass } from './User';

@modelOptions({
  schemaOptions: {
    timestamps: true,
    collection: 'messages',
    versionKey: false,
  },
  options: {
    customName: 'Message',
  },
})
@ObjectType('Message', { description: 'Message Schema' })
export class MessageClass {
  @Field(() => ID, { name: 'id' })
  _id!: ObjectID;

  @Field()
  createdAt?: Date;

  @Field()
  updatedAt?: Date;

  @Field(() => UserClass)
  @prop({ ref: 'User', required: true })
  from: Ref<UserClass>;

  @Field(() => UserClass)
  @prop({ ref: 'User', required: true })
  to: Ref<UserClass>;

  @Field(() => String, { nullable: true })
  @prop()
  text?: string;
}

const Message = getModelForClass(MessageClass);

export default Message;
