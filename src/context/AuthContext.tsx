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
} from "firebase/auth";
import { auth } from "../firebase";

type AuthProviderProps = {
  children: ReactElement;
};

type AuthContextType = {
  user: User | null;
  login: (
    email: string,
    password: string,
    callback?: (error: any, user?: User) => void
  ) => void;
  signup: (
    email: string,
    password: string,
    callback?: (error: any, user?: User) => void
  ) => void;
  signout: (callback: (error: any) => void) => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

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

  function signup(
    email: string,
    password: string,
    callback?: (error: any, user?: User) => void
  ) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user; // Signed in
        if (callback) callback(null, user);
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        if (callback) callback(error);
      });
  }

  function login(
    email: string,
    password: string,
    callback?: (error: any, user?: User) => void
  ) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        if (callback) callback(null, user);
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        if (callback) callback(error);
      });
  }

  function signout(callback?: (error: any) => void) {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        if (callback) callback(null);
      })
      .catch((error) => {
        if (callback) callback(error);
      });
  }

  const value = {
    user,
    signup,
    signout,
    login,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
