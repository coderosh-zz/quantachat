import { Resolver, Query, Arg, Authorized, Mutation, Ctx } from 'type-graphql';
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
  @Mutation(() => Boolean)
  async addFriend(
    @Arg('id')
    id: string,
    @Ctx() context: Context
  ): Promise<boolean> {
    try {
      const friend = await User.findById(id);
      if (!friend) throw new ApolloError('User not found');
      const me = await User.findById(context.currentUser._id);

      if (me!.friends!.includes(id as any)) {
        return true;
      }

      me!.friends!.push(friend.id);
      friend.friends!.push(me!._id);

      await me!.save();
      return true;
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
}

export default UserResolver;
