import { config } from 'dotenv';
import { connectDatabase } from './config/database';

config();
connectDatabase();

export { AuthService } from './services/AuthService'; 