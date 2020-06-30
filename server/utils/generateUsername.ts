import { time } from 'uniqid';
import slugify from 'slugify';

const generateUsername = (email: string): string => {
  const username = slugify(email.split('@')[0] + time());
  return username;
};

export default generateUsername;
