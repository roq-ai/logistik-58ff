import { RoqAuth } from '@roq/nextjs';
import { createAuthorizedFetcher } from 'lib/create-authorized-fetcher';

/*
    You can export RoqAuth without passing any options if you don't need to customize the behaviour
    export default RoqAuth; //handles all the authentication routes automatically
*/

export default RoqAuth({
  hooks: {
    // This hook is optional - and can be used to persist user information,
    // or as in the case below, send them a welcome notification

    onRegisterSuccess: async ({ user, req }) => {
      const fetcher = createAuthorizedFetcher(req);
      await fetcher(`${process.env.NEXT_PUBLIC_ROQ_API_URL}/api/auth-callback/register`);
    },

    onLoginSuccess: async ({ user, req }) => {
      const fetcher = createAuthorizedFetcher(req);
      await fetcher(`${process.env.NEXT_PUBLIC_ROQ_API_URL}/api/auth-callback/login`);
    },
  },
});
