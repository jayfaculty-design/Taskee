import React, { createContext, useState } from "react";

interface AuthContextType {
  message: string;
  status: number;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<{ success: boolean; message: string }>;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<{ success: boolean; message: string }>;
  updateUser: (
    username: string,
    email: string
  ) => Promise<{ success: boolean; message: string }>;
}

export const AuthContext = createContext<AuthContextType | null>(null);
import axios from "axios";

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(200);

  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    try {
      const response = await axios.post(
        "https://taskee-k4pn.onrender.com/auth/register",
        {
          username,
          email,
          password,
        }
      );

      const result = await response.data;
      localStorage.setItem("token", result.token);
      setMessage(result.message);
      return { success: true, message: result.message };
    } catch (error: any) {
      console.error("Error in logging in", error);
      const errorMessage = error.response?.data?.message || "Sign Up Failed";
      setMessage(errorMessage);
      return { success: false, message: errorMessage };
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        "https://taskee-k4pn.onrender.com/auth/login",
        {
          email,
          password,
        }
      );

      const result = response.data;
      localStorage.setItem("token", result.token);
      return { success: true, message: result.message };
    } catch (error: any) {
      console.error("Error in logging in", error);
      const errorMessage = error.response?.data?.message || "Login Failed";
      setStatus(error.response?.status || 500);
      setMessage(errorMessage);
      return { success: false, message: errorMessage };
    }
  };

  const updateUser = async (username: string, email: string) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        "https://taskee-k4pn.onrender.com/auth/update-profile",
        {
          username,
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data;
      return { success: true, message: data.message };
    } catch (error: any) {
      const errorMessage =
        error.reponse?.data?.message || "Error occured, cant update profile";
      return { success: false, message: errorMessage };
    }
  };

  const logout = async () => {
    try {
      const response = await axios.post(
        "https://taskee-k4pn.onrender.com/auth/logout"
      );
      localStorage.removeItem("token");
      return {
        success: true,
        message: response.data?.response?.message || "Logged Out Successfully",
      };
    } catch (error: any) {
      console.error("Error logging out", error);
      const errorMessage = error.response?.data?.message || "Log Out Failed";
      setMessage(errorMessage);
      return { success: false, message: errorMessage };
    }
  };
  return (
    <AuthContext.Provider
      value={{
        login,
        message,
        status,
        logout,
        register,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
