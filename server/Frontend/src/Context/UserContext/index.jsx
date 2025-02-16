import React, { useState, createContext } from "react";

// Create the context
export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userState, setUserState] = useState(null);  
  const [adminState, setAdminState] = useState(" "); 

  return (
    <UserContext.Provider value={{ userState, setUserState, adminState, setAdminState }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider; 
