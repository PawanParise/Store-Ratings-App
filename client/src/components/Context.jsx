// context/UserContext.jsx
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // store user data
  const [allUsers, setAllUser] = useState([]); // store user data
  const [allOwners, setAllOwners] = useState([]); // store user data
  const [allStores, setAllStores] = useState([]); // store user data

  // set user data after login
  const setUserData = (userData) => {
    setUser(userData);
  };

  // reset user data on logout
  const resetUserData = () => {
    setUser(null);
  };

  const setAllUserData = (userData) => {
    setAllUser(userData);
  };

  const setAllOwnersData = (userData) => {
    setAllUser(userData);
  };
  const setAllStoresData = (userData) => {
    setAllUser(userData);
  };

  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/store_app/get-users`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.allUsers) {

          setAllUserData(data.allUsers)
          setAllOwners(data.allUsers.filter((u) => u.type === "Store Owner")); // ✅ filter store owners
        }
      })
      .catch((err) => console.error("Error fetching users:", err));

    fetch(`http://localhost:5000/api/v1/store_app/get-stores`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.allStores) {
          setAllStores(data.allStores); // ✅ set all users

        }
      })
      .catch((err) => console.error("Error fetching stores:", err));

  }, [])

  return (
    <UserContext.Provider value={{ user, setUserData, resetUserData, allUsers, setAllUser, setAllUserData, allOwners, setAllOwnersData, allStores, setAllStoresData }}>
      {children}
    </UserContext.Provider>
  );
};
