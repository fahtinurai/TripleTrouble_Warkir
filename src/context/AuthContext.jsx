import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user dari sessionStorage saat halaman dibuka
  useEffect(() => {
    const savedUser = sessionStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Login user
  const login = (userData) => {
    sessionStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  // Logout user
  const logout = () => {
    sessionStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
