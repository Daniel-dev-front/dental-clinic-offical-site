// import { createContext, useContext, useReducer, useEffect } from "react";
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut,
//   GoogleAuthProvider,
//   signInWithPopup,
//   onAuthStateChanged,
// } from "firebase/auth";
// import { auth } from "../firebase";

// const AuthContext = createContext(null);
// export const useAuth = () => useContext(AuthContext);

// const googleProvider = new GoogleAuthProvider();

// const ADMIN_EMAIL = "dujsenbekovdaniel8@gmail.com";

// const initialState = {
//   user: null,
//   loading: true,
// };

// function authReducer(state, action) {
//   switch (action.type) {
//     case "SET_USER":
//       return { user: action.payload, loading: false };
//     case "LOGOUT":
//       return { user: null, loading: false };
//     default:
//       return state;
//   }
// }

// export const AuthProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(authReducer, initialState);

//   useEffect(() => {
//     const unsub = onAuthStateChanged(auth, (firebaseUser) => {
//       if (!firebaseUser) {
//         dispatch({ type: "LOGOUT" });
//         return;
//       }

//       const normalizedUser = {
//         uid: firebaseUser.uid,
//         email: firebaseUser.email,
//         displayName: firebaseUser.displayName,
//         role: firebaseUser.email === ADMIN_EMAIL ? "admin" : "client",
//       };

//       dispatch({ type: "SET_USER", payload: normalizedUser });
//     });

//     return () => unsub();
//   }, []);

//   const register = (email, password) =>
//     createUserWithEmailAndPassword(auth, email, password);

//   const login = (email, password) =>
//     signInWithEmailAndPassword(auth, email, password);

//   const loginWithGoogle = () => signInWithPopup(auth, googleProvider);

//   const logout = () => signOut(auth);

//   return (
//     <AuthContext.Provider
//       value={{
//         ...state,
//         register,
//         login,
//         loginWithGoogle,
//         logout,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };
