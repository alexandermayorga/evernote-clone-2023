import {
  ReactElement,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  User,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from "firebase/auth";
import { auth } from "../firebase";

type AuthProviderProps = {
  children: ReactElement;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<UserCredential>;
  signout: () => Promise<void>;
  signup: (email: string, password: string) => Promise<UserCredential>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);
//Custom Hook to easily pull auth context data
export const useAuth = () => useContext(AuthContext);

//COMPONENT
export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (newUser) => {
      setUser(newUser);
      setLoading(false); //At this point it did the verification to check if there is a user signed in.
    });
    return unsubscribe;
  }, []);

  const signup = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  }

  const signout = () => signOut(auth);

  const contextValue = {
    user,
    signup,
    signout,
    login,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
