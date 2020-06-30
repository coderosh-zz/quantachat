import Auth0Strategy from 'passport-auth0';
import mongoose from 'mongoose';
import passport from 'passport';
import upsertUser from '../utils/upsertUser';
import User, { UserClass } from '../entities/User';

const strategy = new Auth0Strategy(
  {
    clientID: process.env.AUTH0_CLIENT_ID as string,
    clientSecret: process.env.AUTH0_CLIENT_SECRET as string,
    domain: process.env.AUTH0_DOMAIN_NAME as string,
    callbackURL: process.env.AUTH0_CALLBACK_URL as string,
  },
  async (_accessToken, _refreshToken, _extraParams, profile, done) => {
    await upsertUser(profile.provider, profile, done);
  }
);

passport.serializeUser((user: UserClass, done) => {
  return done(null, user._id);
});

passport.deserializeUser(async (id: string, done) => {
  if (!mongoose.isValidObjectId(id)) return done(null, null);
  const user = await User.findById(id);
  return done(null, user);
});

passport.use(strategy);
