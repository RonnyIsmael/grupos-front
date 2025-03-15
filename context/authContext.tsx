import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { getRequest, postRequest } from "../hooks/api";
import { User } from "../interfaces/UserInterface";
import { API_URL } from "../utils/config";

interface AuthContextType {
  user: User | null; // user ahora es de tipo User o null
  isAuthenticated: boolean | undefined;
  login: (email: string, password: string) => Promise<any>;
  register: (username: string, email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  setIsAuthenticated: (state: boolean) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
export const AuthContextProvider: React.FC<{ children?: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(
    undefined
  );

  useEffect(() => {
    session();
  }, []);

  const login = async (email: any, password: any) => {
    const url = `${API_URL}/auth/login`;
    const data = JSON.stringify({
      email: email,
      password: password,
    });

    try {
      const response = await postRequest(url, data);
      if (!response.succes) {
        console.log("Login KO: " + response.msg);
        return { suscces: false, msg: response.msg };
      }
      setIsAuthenticated(true);
      const user: User = {
        id: response.body.id,
        email: response.body.email,
        user_name: response.body.name,
      };

      setUser(user);
      console.log("login successful:", response);

      return { succes: true, data: response?.body };
    } catch (e: any) {
      console.log("error: " + e);
      console.error("login failed:", e.message);
      return { succes: false, msg: e.message };
    }
  };

  const register = async (username: any, email: any, password: any) => {
    const url = `${API_URL}/auth/register`;
    const data = JSON.stringify({
      user_name: username,
      email: email,
      password: password,
    });

    try {
      const response = await postRequest(url, data);
      console.log(response);
      if (!response.succes) {
        return { suscces: false, msg: response.msj };
      }
      console.log("register successful:", response);
      setUser(response.body);
      return { succes: true, data: response?.body };
    } catch (e: any) {
      console.error("register failed:", e.message);
      return { succes: false, msg: e.message };
    }
  };

  const logout = async () => {
    try {
      const url = `${API_URL}/auth/logout`;
      await postRequest(url, "");
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const session = async () => {
    try {
      const response = await getRequest("auth/session");
      if ((response.status = "OK")) {
        setIsAuthenticated(true);
        const user: User = {
          id: response.body.id,
          email: response.body.email,
          user_name: response.body.name,
        };
        setUser(user);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        setIsAuthenticated,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error("useAuth must be wrapped inside AuthContextProvider");
  }
  return value;
};
