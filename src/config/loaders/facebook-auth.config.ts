import { registerAs } from '@nestjs/config';

export default registerAs('facebookOAuth', () => ({
  appId: process.env.FACEBOOK_APP_ID,
  appSecret: process.env.FACEBOOK_APP_SECRET,
  callbackUrl: process.env.FACEBOOK_CALLBACK_URL,
}));
