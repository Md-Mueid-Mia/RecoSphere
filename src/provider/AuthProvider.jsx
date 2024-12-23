import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import auth from '../firebase/firebase.config';
import AuthContext from './AuthContext';

const googleProvider = new GoogleAuthProvider;
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading]= useState(true)
    

    const createUser = (email, password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signOutUser = () => {
        setLoading(true)
       return signOut(auth)
    

    }
    const updateUserProfile = (updatedData)=>{
        setLoading(true)
        return updateProfile(auth.currentUser, updatedData);
      }

    const signInWitGoogle = ()=>{
        setLoading(true)
       return signInWithPopup(auth, googleProvider)
    }
    useEffect(() =>{
      const unsubscribe =  onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser)
            console.log('state captured', currentUser);
            setLoading(false);
        })
        return ()=>{
            unsubscribe();
        };
    },[])

    const authInfo = {
        user,
        setUser,
        loading,
        createUser,
        signIn,
        signOutUser,
        signInWitGoogle,
        updateUserProfile


    }
  
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;