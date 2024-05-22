import React, { createContext, useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);
        // get user from database and setUser() as database user - currently using firebase user
      });
  
      return () => unsubscribe();
    }, []);

    const handleSignOut = async () => {
        try {
          await signOut(auth);
          setUser(null);
          console.log('User logged out successfully!');
        } catch (error) {
          console.error('Sign out error:', error.message);
        }
      };

    return (
        <AuthContext.Provider value={{ user, setUser, handleSignOut }}>
          {children}
        </AuthContext.Provider>
    );
}