import { createContext, useState } from "react";
import { signInWithGoogle } from "../services/firebase/firebase";

export const UserCtx = createContext({
  currentUser: null,
  signIn: () => {},
});

export function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  const signIn = async () => {
    const user = await signInWithGoogle();

    setCurrentUser(user);
  };

  return (
    <UserCtx.Provider
      value={{
        currentUser,
        signIn,
      }}
    >
      {children}
    </UserCtx.Provider>
  );
}