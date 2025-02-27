import { AuthService } from '../../auth/src';

const authService = new AuthService();

export const resolvers = {
  Mutation: {
    authenticateWithGoogle: async (_: any, { token }: { token: string }) => {
      const user = await authService.validateOAuthToken(token);
      const session = await authService.createSession(user);
      
      return {
        accessToken: session.accessToken,
        refreshToken: session.refreshToken
      };
    }
  }
}; 