
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { AuthContext } from './AuthContext';
import { auth } from '../firebase/firebase.config';
import { useEffect, useState } from 'react';
const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const [isLoading,setIsLoading] =useState(true);

    // signin with google
    const googleSignIn = () =>{
       return signInWithPopup(auth,googleProvider);
    }
    // sign in with email and password
    const createUser = (email,password) => {
        return createUserWithEmailAndPassword(auth,email,password);
    }
    // signin with email
    const login = (email,password) => {
        return signInWithEmailAndPassword(auth,email,password);
    }
    // sign out
    const logout  = () => {
        return signOut(auth);
    }
    // state of user 
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth,currentUser => {
            console.log('Auth state', currentUser)
            setUser(currentUser)
            setIsLoading(false)
        })
        return ()  => unsubscribe();
    },[])


    const value ={
        googleSignIn,
        createUser,
        login,
        logout,
        setUser,
        user,
        isLoading,
        setIsLoading
        
    };
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;