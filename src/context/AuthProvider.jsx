import { createContext, useContext, useReducer, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  updateProfile,
  updateProfile as firebaseUpdateProfile,
} from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const googleProvider = new GoogleAuthProvider();
const ADMIN_EMAIL = "dujsenbekovdaniel8@gmail.com";

const initialState = {
  user: null,
  isAdmin: false,
  loading: true,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        user: action.payload.user,
        isAdmin: action.payload.isAdmin,
        loading: false,
      };
    case "LOGOUT":
      return {
        user: null,
        isAdmin: false,
        loading: false,
      };
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({
          type: "SET_USER",
          payload: {
            user,
            isAdmin: user.email === ADMIN_EMAIL,
          },
        });
      } else {
        dispatch({ type: "LOGOUT" });
      }
    });

    return () => unsub();
  }, []);

  // const register = async (name, email, password) => {
  //   const res = await createUserWithEmailAndPassword(auth, email, password);
  //   dispatch({
  //     type: "SET_USER",
  //     payload: {
  //       user: res.user,
  //       isAdmin: res.user.email === ADMIN_EMAIL,
  //     },
  //   });
  // };
  const register = async (name, email, password) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(res.user, {
      displayName: name,
    });
    await res.user.reload();
    dispatch({
      type: "SET_USER",
      payload: {
        user: res.user,
        isAdmin: res.user.email === ADMIN_EMAIL,
      },
    });
  };
  const login = async (email, password) => {
    const res = await signInWithEmailAndPassword(auth, email, password);
    dispatch({
      type: "SET_USER",
      payload: {
        user: res.user,
        isAdmin: res.user.email === ADMIN_EMAIL,
      },
    });
  };

  const loginWithGoogle = async () => {
    const res = await signInWithPopup(auth, googleProvider);

    dispatch({
      type: "SET_USER",
      payload: {
        user: res.user,
        isAdmin: res.user.email === ADMIN_EMAIL,
      },
    });
  };
  const updateUserProfile = async (profileData) => {
    try {
      if (!auth.currentUser) throw new Error("Пользователь не авторизован");

      await firebaseUpdateProfile(auth.currentUser, {
        displayName: profileData.displayName,
        photoURL: profileData.photoURL || auth.currentUser.photoURL,
      });

      // Обновляем состояние пользователя
      const updatedUser = {
        ...auth.currentUser,
        displayName: profileData.displayName,
      };
      dispatch({
        type: "SET_USER",
        payload: {
          user: updatedUser,
          isAdmin: updatedUser.email === ADMIN_EMAIL,
        },
      });

      console.log("✅ Профиль обновлён");
    } catch (error) {
      console.error("❌ Ошибка обновления профиля:", error);
      throw error;
    }
  };

  const logout = async () => {
    await signOut(auth);
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        register,
        login,
        loginWithGoogle,
        logout,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
