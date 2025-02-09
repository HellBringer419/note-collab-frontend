import { io } from 'socket.io-client';
import userStore from './stores/UserStore';

// "undefined" means the URL will be computed from the `window.location` object
export const socket = io(
  import.meta.env.REACT_APP_BASE_BACKEND_URL ?? "ws://localhost:8080",
  {
    autoConnect: false,
    auth: {
      token: userStore.token, // Use the token from the user store
    },
  },
);