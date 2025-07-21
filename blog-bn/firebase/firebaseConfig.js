import admin from 'firebase-admin';
import dotenv from 'dotenv';
import { createRequire } from 'module';

dotenv.config();


const require = createRequire(import.meta.url);
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
