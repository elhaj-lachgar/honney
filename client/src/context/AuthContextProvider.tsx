import { createContext, useContext, useEffect, useState } from "react";
import { TUser } from "../constant/types";

type TAuthContext = {
  authUser: TUser | null;
  setAuthUser: (user: TUser | null) => void;
};

const initialize: TAuthContext = {
  authUser: null,
  setAuthUser: () => {},
};

const AuthContext = createContext<TAuthContext>(initialize);

function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const user =
    (JSON.parse(window.localStorage.getItem("user") as string)) ||
    null;

  const [authUser, setAuthUser] = useState<TUser | null>(user);
  useEffect(() => {
    if (!window.localStorage.getItem("user")) return;

    const user = JSON.parse(
      window.localStorage.getItem("user") as string
    ) as TUser;
    setAuthUser(user);
  }, []);
  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;

export const useAuthContext = () => {
  return useContext(AuthContext);
};
