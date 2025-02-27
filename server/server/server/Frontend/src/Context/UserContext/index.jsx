import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userState, setUserState] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser 
  });

  useEffect(() => {
    if (userState) {
      localStorage.setItem("user", JSON.stringify(userState));
    } else {
      localStorage.removeItem("user");
    }
  }, [userState]);

  return (
    <UserContext.Provider value={{ userState, setUserState }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
