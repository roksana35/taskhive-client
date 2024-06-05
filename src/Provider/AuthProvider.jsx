import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext=createContext(null);
const auth = getAuth(app);

const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null)
    const [loading,setloading]=useState(true);
    const axiosPublic=useAxiosPublic()
    const googleProvider=new GoogleAuthProvider();

    const signUpUser=(email,password)=>{
        setloading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }
    const loginUser=(email,password)=>{
        setloading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }
    const googleLogIn=()=>{
        setloading(true)
        return signInWithPopup(auth,googleProvider)
    }
    const logOut=()=>{
        setloading(true)
        return signOut(auth)
    }

    const updateProfileUser=(name,photo)=>{
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
          })
    }

    useEffect(()=>{
        onAuthStateChanged(auth,currentUser=>{
            setUser(currentUser)
            if(currentUser){
                const userInfo={email:currentUser.email}
                axiosPublic.post('/jwt',userInfo)
                .then(res => {
                    if(res.data.token){
                        localStorage.setItem('access-token',res.data.token)
                    }
                })

            }
            else{
                localStorage.removeItem('access-token')

            }
            setloading(false)
        })
    },[axiosPublic])

    const authInfo={
        user,
        loading,
        signUpUser,
        loginUser,
        googleLogIn,
        logOut,
        updateProfileUser
        

        
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;