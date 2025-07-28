import axios from 'axios';
import { auth } from '../firebase/firebase';

const instance = axios.create({
  baseURL: 'https://myblog-2-1iko.onrender.com/',
});

instance.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
