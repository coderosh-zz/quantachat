import { Resolver, Query, Arg, Authorized, Mutation, Ctx } from 'type-graphql';
import { isValidObjectId } from 'mongoose';
import User, { UserClass } from '../../entities/User';
import { Context } from '../../Context';

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
