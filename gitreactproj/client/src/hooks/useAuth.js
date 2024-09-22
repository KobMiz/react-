import React, { createContext, useContext, useState, useEffect } from "react";
import { setAuthHeader } from "../services/httpService";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setAuthHeader();
      const fetchUser = async () => {
        try {
          const userData = await fetchUserData();
          setUser(userData); 
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }
      };
      fetchUser();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
