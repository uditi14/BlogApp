import { createContext, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [userinfo, setuserinfo] = useState(null);
  return (
    <UserContext.Provider value={{ userinfo, setuserinfo }}>
      {children}
    </UserContext.Provider>
  );
}