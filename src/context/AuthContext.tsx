import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, googleProvider } from '../firebase';
import { 
  User, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  signupWithEmail: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const syncUserToFirestore = async (user: User) => {
    try {
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          name: user.displayName || user.email?.split('@')[0] || 'Unknown User',
          email: user.email,
          city: 'Unknown',
          country: 'Unknown',
          joinDate: new Date().toISOString(),
          status: 'active',
          role: 'user',
          trips: 0,
          avatar: (user.displayName || user.email || '?').charAt(0).toUpperCase()
        });
      }
    } catch (err) {
      console.error("Failed to sync user to Firestore", err);
    }
  };

  const loginWithGoogle = async () => {
    const res = await signInWithPopup(auth, googleProvider);
    await syncUserToFirestore(res.user);
  };

  const loginWithEmail = async (email: string, pass: string) => {
    const res = await signInWithEmailAndPassword(auth, email, pass);
    await syncUserToFirestore(res.user);
  };

  const signupWithEmail = async (email: string, pass: string) => {
    const res = await createUserWithEmailAndPassword(auth, email, pass);
    await syncUserToFirestore(res.user);
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      loading,
      loginWithGoogle,
      loginWithEmail,
      signupWithEmail,
      logout
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
