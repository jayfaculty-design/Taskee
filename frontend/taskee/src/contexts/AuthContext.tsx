import React, { createContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(200);
  

  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    try {
      const response = await axios.post("http://localhost:5000/auth/register", {
        username,
        email,
        password,
      });

      const result = await response.data;
      localStorage.setItem("token", result.token);
      setMessage(result.message);
      return { success: true, message: result.message };
    } catch (error: any) {
      console.error("Error in logging in", error);
      const errorMessage = error.response?.data?.message || "Sign Up Failed";
      setMessage(errorMessage);
      return { status: false, message: errorMessage };
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });

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

  const logout = async () => {
    try {
      const response = await axios.post("http://localhost:5000/auth/logout");
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
