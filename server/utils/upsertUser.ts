import User from '../entities/User';
import { Profile } from 'passport-auth0';
import generateUsername from './generateUsername';

const upsertUser = async (
  provider: string,
  profile: Profile,
  done: (error: any, user?: any, info?: any) => void
): Promise<void> => {
  try {
    const email = profile.emails![0].value;
    const user = await User.findOne({ email });

    if (user) {
      return done(null, user);
    }
    const newUser = await User.create({
      email,
      name: profile.displayName,
      provider,
      socialId: profile.id,
      profileUrl: profile.profileUrl || (profile as any).picture,
      username: generateUsername(email),
    });

    console.log(provider);
    done(null, newUser);
  } catch (e) {
    done(e, null);
  }
};

export default upsertUser;
