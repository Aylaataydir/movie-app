"use client"
import { auth } from "@/auth/firebase"
import { toastErrorNotify, toastSuccessNotify, toastWarnNotify } from "@/helpers/ToastNotify"
import { EmailAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, reauthenticateWithCredential, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updatePassword, updateProfile } from "firebase/auth"
import { useRouter } from "next/navigation"
// next.js projesinde reaccta ait hookk kullanacaksak use client yazmaliyiz.

import { createContext, useEffect, useState } from "react"




export const AuthContextt = createContext()

const AuthContextProvider = ({ children }) => {

  const [currentUser, setCurrrentUser] = useState('')


  //nextjs in navigasyon hooku
  const router = useRouter()


  // new User

  const createUser = async (email, password, displayName) => {

    try {

      await createUserWithEmailAndPassword(auth, email, password)

      await updateProfile(auth.currentUser, {
        displayName,
      })

      toastSuccessNotify(`Welcome ${displayName}`)
      router.push('/profile')

    } catch (error) {
      toastErrorNotify(error.message)
    }

  }


  // //* https://console.firebase.google.com/
  // //* => Authentication => sign-in-method => enable Email/password
  // //! Email/password ile girişi enable yap
  // const signIn = async (email, password) => {
  //   try {
  //     //? mevcut kullanıcının giriş yapması için kullanılan firebase metodu
  //     await signInWithEmailAndPassword(auth, email, password);
  //     toastSuccessNotify("Logged in successfully!");
  //     router.push("/profile");
  //   } catch (err) {
  //     toastErrorNotify(err.message);
  //     // alert(err.message);
  //   }
  // };


  const login = async (email, password) => {

    try {

      await signInWithEmailAndPassword(auth, email, password);
      router.push("/profile");
      toastSuccessNotify("Logged in Successfully");
      console.log(currentUser)
    } catch (error) {
      toastErrorNotify("Something went wrong. Please try again.");
    }
  };



  const signUpWithGoogle = async () => {

    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider)
      router.push("/profile");
      toastSuccessNotify("Logged in Successfully");
      console.log(currentUser)

    } catch (error) {
      toastErrorNotify("Something went wrong. Please try again.")
    }
  }


  const logout = async () => {

    try {
      await signOut(auth);
      toastSuccessNotify("logout is successfully");
      router.push("/login");
    } catch (error) {
      toastErrorNotify(error.message);
    }

  };


  const forgotPassword = async (email) => {

    if (!email) {
      toastErrorNotify("Please enter a Email")
    } else {
      try {

        await sendPasswordResetEmail(auth, email)
        toastWarnNotify("Please check your Email.")

      } catch (error) {
        toastErrorNotify(error.message);
      }
    }

  };


  const updateUserProfile = async (displayName, photoURL) => {
    try {
      await updateProfile(auth.currentUser, { displayName, photoURL })
      setCurrrentUser((prev) => ({ ...prev, displayName, photoURL }))
      toastSuccessNotify("Profile updated successfully.")
    } catch (error) {
      toastErrorNotify(error.message)
    }
  };


  const changeUserPassword = async (currentPassword, newPassword) => {
    try {
      const credential = EmailAuthProvider.credential(auth.currentUser.email, currentPassword)
      await reauthenticateWithCredential(auth.currentUser, credential)
      await updatePassword(auth.currentUser, newPassword)
      toastSuccessNotify("Password updated successfully.")
    } catch (error) {
      toastErrorNotify(error.message)
    }
  };


  const userChanged = () => {
    onAuthStateChanged(auth, (user) => {

      if (user) {
        const { email, photoURL, displayName } = user
        setCurrrentUser({ email, displayName, photoURL })
      } else {
        setCurrrentUser(false)
      }

    })
  }

  useEffect(() => {
    userChanged()
  }, [])


  return (
    <AuthContextt.Provider value={{ createUser, currentUser, signUpWithGoogle, login, logout, forgotPassword, updateUserProfile, changeUserPassword }}>
      {children}
    </AuthContextt.Provider>
  )
}

export default AuthContextProvider
