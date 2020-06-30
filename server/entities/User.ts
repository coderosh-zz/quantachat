import {
  getModelForClass,
  prop,
  modelOptions,
  Ref,
} from '@typegoose/typegoose';
import { ObjectID } from 'mongodb';
import { Field, ID, ObjectType } from 'type-graphql';

@modelOptions({
  schemaOptions: {
    timestamps: true,
    collection: 'users',
    versionKey: false,
  },
  options: {
    customName: 'User',
  },
})
@ObjectType('User', { description: 'User Schema' })
export class UserClass {
  @Field(() => ID, { name: 'id' })
  _id!: ObjectID;

  @Field()
  @prop({ required: true })
  name!: string;

  @Field()
  createdAt?: string;

  @Field()
  updatedAt?: string;

  @Field()
  @prop({ required: true, unique: true })
  email!: string;

  @Field()
  @prop({ required: true, unique: true })
  username!: string;

  @Field(() => [UserClass])
  @prop({ ref: 'User', default: [] })
  friends?: Ref<UserClass>[];

  @Field()
  @prop({ required: true })
  provider!: string;

  @Field()
  @prop({ required: true })
  socialId!: string;

  @Field()
  @prop({ required: true })
  profileUrl!: string;
}

const User = getModelForClass(UserClass);

export default User;
