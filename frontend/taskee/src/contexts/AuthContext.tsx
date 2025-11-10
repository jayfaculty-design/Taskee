import React, { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
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
      if (response.status !== 200) throw new Error("Network not ok!");
      if (response.status === 200) {
        const result = await response.data;
        localStorage.setItem("token", result.token);
        setMessage(result.message);
      }
    } catch (error: any) {
      console.error("Error in logging in", error);
      setMessage(error.response.data.message);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });

      const result = response.data;
      setMessage(result.message);
      setStatus(response.status);
      localStorage.setItem("token", result.token);
    } catch (error: any) {
      console.error("Error in logging in", error);
      setStatus(error.response?.status || 500);
      setMessage(error.response?.data?.message || "Login failed");
      return false;
    }
  };

  const logout = async () => {
    const response = await axios.post("http://localhost:5000/auth/logout");
    if (response.status !== 200) throw Error("Network Not ok!");
    localStorage.removeItem("token");
    setMessage(response.data.message);
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
