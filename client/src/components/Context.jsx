// context/UserContext.jsx
import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // store user data

  // set user data after login
  const setUserData = (userData) => {
    setUser(userData);
  };

  // reset user data on logout
  const resetUserData = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUserData, resetUserData }}>
      {children}
    </UserContext.Provider>
  );
};
