import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile,  } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";



export const AuthContext=createContext(null);
const googleProvider=new GoogleAuthProvider();
const auth =getAuth(app)
const Authprovider = ({children}) => {
    const [user,setUser]=useState('');
    const [loading,setLoading]=useState(true)

    const createuser=(email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const loginuser=(email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }

    const updateuser=(name,photo)=>{
        return updateProfile(auth.currentUser,{
            displayName:name,
            photoURL:photo
        })
    }

    const googleSignIn=()=>{
        return signInWithPopup(auth,googleProvider)
    }
    const updateProfileUser=(name,photo)=>{
        return updateProfile(auth.currentUser,{
            displayName:name,
            photoURL:photo
        })
    }

    const logoutUser=()=>{
        return signOut(auth)
    }




    useEffect(()=>{
        const unSubscribe=onAuthStateChanged(auth, (currentuser) => {
            // console.log(currentuser)
            
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/auth.user
              setUser(currentuser);
              
              
              setLoading(false)
              // ...
            
          });
          return ()=>{
            unSubscribe();
          }
    },[])

    

        const authInfo={
            createuser,
            updateuser,
            user,setUser,
            loginuser,
            googleSignIn,
            logoutUser,
            loading,setLoading,
            updateProfileUser



        }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default Authprovider;