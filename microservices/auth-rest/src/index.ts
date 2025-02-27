import express from 'express';
import { AuthService } from '../../auth/src';

const app = express();
const authService = new AuthService();

app.use(express.json());

app.post('/auth/google', async (req, res) => {
  try {
    const { token } = req.body;
    const user = await authService.validateOAuthToken(token);
    const session = await authService.createSession(user);
    
    res.json({
      accessToken: session.accessToken,
      refreshToken: session.refreshToken
    });
  } catch (error) {
    res.status(401).json({ error: 'Authentication failed' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Auth REST service running on port ${PORT}`);
}); 