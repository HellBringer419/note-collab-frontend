import { getNotesCollaborationAPI } from "@/swagger/apis/notesCollaborationAPI";
import { User } from "@/swagger/model";
import { makeAutoObservable } from "mobx";

const api = getNotesCollaborationAPI();
class UserStore {
  user: User | null = null;
  token = localStorage.getItem("token") || null; // Load token from localStorage if available
  isAuthenticated = !!this.token; // Checks if a user is authenticated

  constructor() {
    makeAutoObservable(this);
  }

  // Set user data after successful login
  setUser(user: User) {
    this.user = user;
  }

  // Set the token after successful login and store it in localStorage
  setToken(token: string) {
    this.token = token;
    localStorage.setItem("token", token); // Persist token to localStorage
    this.isAuthenticated = true;
  }

  // Login: Simulate login API call and update the store
  async login(username: string, password: string): Promise<User | null> {
    try {
      // Simulate an API call here (replace with your actual login API)
      const response = await api.loginUser({ email: username, password }); // Replace with your actual API
      if (response.data && response.status >= 200 && response.status < 400) {
        if (!response.data.user || !response.data.token)
          throw new Error("Missing data");
        this.setUser(response.data.user);
        this.setToken(response.data.token);
        return response.data.user;
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      return null;
      console.error("Login failed:", error);
    }
  }

  // Logout: Remove token and user data
  logout() {
    this.user = null;
    this.token = null;
    this.isAuthenticated = false;
    localStorage.removeItem("token"); // Remove token from localStorage
  }

  async register(
    email: string,
    name: string,
    password: string,
    avatar: string,
  ): Promise<User | null> {
    try {
      const response = await api.registerUser({
        email,
        name,
        password,
        avatar,
      });
      if (response.data && response.status >= 200 && response.status < 400) {
        if (!response.data.user || !response.data.token)
          throw new Error("Missing data");
        userStore.setUser(response.data.user);
        userStore.setToken(response.data.token);
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.error("Register failed:", error);
    }
    return null;
  }

  // Forgot Password: Simulate forgot password API call
  async forgotPassword(email: string) {
    try {
      // Simulate API call for forgotten password (replace with your actual API)
      const response = await api.requestPasswordReset({ email }); // Replace with your actual API
      if (response.status < 400 && response.status >= 200) {
        alert("Password reset link sent to your email");
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.error("Forgot password failed:", error);
    }
  }
}

const userStore = new UserStore();
export default userStore;
