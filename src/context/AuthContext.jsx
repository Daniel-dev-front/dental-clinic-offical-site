import { createContext, useContext, useReducer, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../Firebase";
// import { useAuth } from "./AuthContext";

const googleProvider = new GoogleAuthProvider();

const authContext = createContext();
export const useAuth = () => useContext(authContext);

const initialState = {
  user: null,
  loading: true,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload.user,
        isAdmin: action.payload.isAdmin,
        loading: false,
      };
    case "LOGOUT":
      return { ...state, user: null, loading: false };
    default:
      return state;
  }
};

const AuthContext = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({ type: "SET_USER", payload: { user } });
      } else {
        dispatch({ type: "LOGOUT" });
      }
    });

    return () => unsubscribe();
  }, []);
  const register = async (email, password) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      dispatch({
        type: "SET_USER",
        payload: { user: res.user },
      });
    } catch (err) {
      console.error("Ошибка регистрации:", err.message);
    }
  };

  const login = async (email, password) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      dispatch({ type: "SET_USER", payload: { user: res.user } });
    } catch (err) {
      console.error("Ошибка входа:", err.message);
    }
  };

  const loginWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      dispatch({ type: "SET_USER", payload: { user: res.user } });
    } catch (err) {
      console.error("Ошибка Google входа:", err.message);
    }
  };

  // --- Logout ---
  const logout = async () => {
    await signOut(auth);
    dispatch({ type: "LOGOUT" });
  };

  return (
    <authContext.Provider
      value={{
        ...state,
        register,
        login,
        logout,
        loginWithGoogle,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthContext;
