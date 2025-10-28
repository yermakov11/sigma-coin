import { createContext, useState, useContext, ReactNode, useEffect } from "react";

interface User {
  name: string;
  surname: string;
  email: string;
  password: string;
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  login: (userData: User) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
}

const AuthContext = createContext<UserContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error when parsing JSON from localStorage:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const isAuthenticated = () => Boolean(user);

  const login = (userData: User) => {
    if (!userData) {
      console.error("Error: Incorrect login details have been transmitted");
      return;
    }
    localStorage.setItem("user", JSON.stringify(userData)); 
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user"); 
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used internally AuthProvider");
  }
  return context;
};
