import { createContext, useContext, useState, useEffect } from "react";
import usersService from "../services/usersService";

const fn_error_context_must_be_used = () => {
  throw new Error("must use authContext provider for consumer to work");
};

export const authContext = createContext({
  user: null,
  login: fn_error_context_must_be_used,
  logout: fn_error_context_must_be_used,
  signUp: fn_error_context_must_be_used,
});
authContext.displayName = "auth";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(usersService.getUser());

  useEffect(() => {
    setUser(usersService.getUser());
  }, []);

  const refreshUser = () => setUser(usersService.getUser());

  const login = async (credentials) => {
    try {
      const response = await usersService.login(credentials);
      refreshUser(); 
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    usersService.logout();
    setUser(null);
  };

  return (
    <authContext.Provider
      value={{ user, login, logout, signUp: usersService.createUser }}
    >
      {children}
    </authContext.Provider>
  );
}

export function useAuth() {
  return useContext(authContext);
}
