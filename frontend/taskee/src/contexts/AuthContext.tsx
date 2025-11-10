import React, { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [status, setStatus] = useState(200);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });
      if (response.status !== 200) throw Error("Network not Okay");
      const result = await response.data;
      setMessage(result.message);
      setStatus(response.status);
      localStorage.setItem("token", result.token);
    } catch (error: any) {
      console.error("Error in logging in", error);
      setStatus(error.response.status);
      setMessage(error.response.data.message);
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
