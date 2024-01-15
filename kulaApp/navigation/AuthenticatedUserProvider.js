import React, { useState, createContext } from "react";

export const AuthenticatedUserContext = createContext({});

export const AuthenticatedUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [order, setOrder] = useState(false);

  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser,order,setOrder }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};
