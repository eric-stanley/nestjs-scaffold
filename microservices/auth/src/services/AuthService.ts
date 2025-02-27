import { OAuth2Client } from 'google-auth-library';
import User, { IUser } from '../models/User';
import Session, { ISession } from '../models/Session';
import jwt from 'jsonwebtoken';

export class AuthService {
  private oauthClient: OAuth2Client;

  constructor() {
    this.oauthClient = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );
  }

  async validateOAuthToken(token: string): Promise<IUser> {
    const ticket = await this.oauthClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    if (!payload) throw new Error('Invalid token');

    let user = await User.findOne({ oauthId: payload.sub });
    
    if (!user) {
      user = await User.create({
        email: payload.email,
        name: payload.name,
        oauthProvider: 'google',
        oauthId: payload.sub
      });
    }

    return user;
  }

  async createSession(user: IUser): Promise<ISession> {
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    );

    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_REFRESH_SECRET!,
      { expiresIn: '7d' }
    );

    const session = await Session.create({
      userId: user._id,
      accessToken,
      refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
    });

    return session;
  }

  async validateSession(accessToken: string): Promise<IUser | null> {
    try {
      const session = await Session.findOne({ accessToken });
      if (!session) return null;

      const user = await User.findById(session.userId);
      return user;
    } catch (error) {
      return null;
    }
  }
} 