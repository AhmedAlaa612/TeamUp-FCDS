import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { fetchUserData, Login, Logout, Register } from "../services/Auth";
import { User } from "../models/responses";

interface AuthContextType {
  userId: number | null;
  isAuthenticated: boolean;
  token: string | null;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  registerUser: (user: User, password: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [userId, setUserId] = useState<number | null>(() => {
    return parseInt(localStorage.getItem("userId") as string);
  });
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("token");
  });
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const initializeAuth = async () => {
      if (token) {
        setIsAuthenticated(true);
        try {
          const userData = await fetchUserData(token);
          setUser(userData);
        } catch (error) {
          console.error("Failed to fetch user data:", error);
          logout();
        }
      }
    };

    initializeAuth();
  }, [token]);

  const login = async (email: string, password: string) => {
    const response = await Login(email, password);
    if (response.access_token) {
      setIsAuthenticated(true);
      setUserId(response.user.id);
      setToken(response.token);
      setUser(response.user);

      localStorage.setItem("token", response.access_token);
      localStorage.setItem("userId", response.user.id.toString());
    }
    return true;
  };

  const logout = async () => {
    const response = await Logout();
    if (response.status === 200) {
      setIsAuthenticated(false);
      setUserId(null);
      setUser(null);
      setToken(null);

      localStorage.removeItem("token");
      localStorage.removeItem("userId");

      return;
    }
    alert("Error logging out");
  };

  const registerUser = async (user: User, password: string) => {
    const response = await Register(user, password);
    if (response.access_token) {
      setIsAuthenticated(true);
      setUserId(response.user.id);
      setToken(response.token);
      setUser(response.user);

      localStorage.setItem("token", response.access_token);
      localStorage.setItem("userId", response.user.id.toString());
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userId,
        token,
        user,
        login,
        logout,
        registerUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
