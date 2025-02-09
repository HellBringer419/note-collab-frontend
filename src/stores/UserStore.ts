import { getNotesCollaborationAPI } from "@/swagger/apis/notesCollaborationAPI";
import { User } from "@/swagger/model";
import { AxiosError } from "axios";
import { makeAutoObservable } from "mobx";

const api = getNotesCollaborationAPI();
class UserStore {
  user: User | null = null;
  token = localStorage.getItem("token") || null; // Load token from localStorage if available
  isAuthenticated = !!this.token; // Checks if a user is authenticated

  constructor() {
    makeAutoObservable(this);
    this.token = localStorage.getItem("token") || null; // Load token from localStorage if available
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
  async login(username: string, password: string): Promise<User> {
    try {
      const response = await api.loginUser({ email: username, password }); // Replace with your actual API
      if (response.data && response.status >= 200 && response.status < 400) {
        if (!response.data.user || !response.data.token)
          return new Error("Missing data");
        this.setUser(response.data.user);
        this.setToken(response.data.token);
        return response.data.user;
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.error("Login failed:", error);
      if (error instanceof AxiosError) {
        switch (error.status) {
          case 200:
            break;
          case 400:
            throw new Error(error.response?.data.message ?? "Login failed");
          case 401:
            throw new Error("Invalid credentials");
          case 403:
            throw new Error("Access denied");
          case 404:
            throw new Error("User not found");
          default:
            throw new Error("Server error");
        }
      }
      throw new Error("Unknown Error");
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
    avatar: string | undefined | null,
  ): Promise<User> {
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
        return response.data.user;
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        switch (error.status) {
          case 200:
            break;
          case 400:
            throw new Error(error.response?.data.message ?? "Registration failed");
          case 401:
            throw new Error("Invalid credentials");
          case 403:
            throw new Error("Access denied");
          case 404:
            throw new Error("User not found");
          default:
            throw new Error("Server error");
        }
      }
      throw new Error("Unknown Error");
    }
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
      if (error instanceof AxiosError) {
        switch (error.status) {
          case 200:
            break;
          case 400:
            throw new Error(error.response?.data.message ?? "Password reset failed");
          case 401:
            throw new Error("Invalid credentials");
          case 403:
            throw new Error("Access denied");
          case 404:
            throw new Error("User not found");
          default:
            throw new Error("Server error");
  
        }
      }
      throw new Error("Unknown Error");
    }
  }
}

const userStore = new UserStore();
export default userStore;
