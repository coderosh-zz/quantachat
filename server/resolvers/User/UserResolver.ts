/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  Resolver,
  Query,
  Arg,
  Authorized,
  Mutation,
  Ctx,
  FieldResolver,
  Root,
} from 'type-graphql';
import { isValidObjectId } from 'mongoose';
import User, { UserClass } from '../../entities/User';
import { Context } from '../../Context';
import { ApolloError } from 'apollo-server-express';

@Resolver(() => UserClass)
class UserResolver {
  @Query(() => [UserClass])
  async users(): Promise<UserClass[]> {
    return await User.find({});
  }

  @Query(() => UserClass, { nullable: true })
  async user(@Arg('id') id: string): Promise<UserClass | null> {
    if (!isValidObjectId(id)) return null;

    return await User.findById(id);
  }

  // @Authorized()
  @Query(() => UserClass, { nullable: true })
  async me(@Ctx() context: Context): Promise<UserClass | undefined> {
    return context.getUser();
  }

  @Authorized()
  @Mutation(() => UserClass)
  async addFriend(
    @Arg('id')
    id: string,
    @Ctx() context: Context
  ): Promise<UserClass> {
    try {
      const friend = await User.findByIdAndUpdate(
        id,
        {
          $addToSet: { friends: context.currentUser._id },
        },
        { new: true }
      );

      if (!friend) throw new ApolloError('User not found');

      await User.findByIdAndUpdate(
        context.currentUser._id,
        {
          $addToSet: { friends: friend._id },
        },
        { new: true }
      );

      return friend;
    } catch (e) {
      throw new ApolloError(e);
    }
  }

  @Authorized()
  @Mutation(() => UserClass)
  async removeFriend(
    @Arg('id')
    id: string,
    @Ctx() context: Context
  ): Promise<UserClass> {
    try {
      const friend = await User.findByIdAndUpdate(
        id,
        {
          $pull: { friends: context.currentUser._id },
        },
        { new: true }
      );

      if (!friend) throw new ApolloError('User not found');

      await User.findByIdAndUpdate(
        context.currentUser._id,
        { $pull: friend._id },
        { new: true }
      );

      return friend;
    } catch (e) {
      throw new ApolloError(e);
    }
  }

  @Authorized()
  @Mutation(() => Boolean)
  logout(@Ctx() context: Context): Promise<boolean> {
    const { req, res } = context;
    return new Promise((resolve, reject) => {
      req.logout();
      req.session!.destroy(() => {
        return reject(false);
      });
      res.clearCookie('sid');
      return resolve(true);
    });
  }

  @FieldResolver(() => [UserClass])
  async friends(@Root() parent: any): Promise<UserClass[]> {
    try {
      const friends = await User.findById(parent.id)
        .populate('friends')
        .map((f) => f!.friends);
      if (!friends) throw new ApolloError('Something went wrong');
      return friends as any;
    } catch (e) {
      throw new ApolloError(e);
    }
  }
}

export default UserResolver;
