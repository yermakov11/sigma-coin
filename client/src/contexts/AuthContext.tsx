import React, { createContext,  useEffect, useState, ReactNode, Dispatch, SetStateAction, useContext } from 'react';


interface AuthContextType {
  token: string | null;
  userData: UserData | null;
  isAuthenticated: boolean;
  setToken: Dispatch<SetStateAction<string | null>>;
  setUserData: Dispatch<SetStateAction<UserData | null>>;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  login: (newToken: string, newData: UserData) => void;
  logout: () => void;
}

interface UserData {
    login: string;
    name: string;
    surname: string;
    password: string;
    email: string;
}

interface AuthProviderProps {
  children: ReactNode;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const storedData = JSON.parse(localStorage.getItem('user_data') as string);

  useEffect(() => {
    if (storedData) {
      const { userToken, user } = storedData;
      setToken(userToken);
      setUserData(user);
      setIsAuthenticated(true);
    }
  }, []);
 const login=(newToken:any,newData:any)=>{
        localStorage.setItem(
            'user_data',
            JSON.stringify({ userToken: newToken, user: newData })
        )
        setToken(newToken);
        setUserData(newData);
        setIsAuthenticated(true);
 }
 const logout=()=>{
     localStorage.removeItem('user_data');
     setToken(null);
     setUserData(null);
     setIsAuthenticated(false);
 }
  return (
    <AuthContext.Provider value={{ token, userData, isAuthenticated, setToken, setUserData, setIsAuthenticated,login,logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  };
