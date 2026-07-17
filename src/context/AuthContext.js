"use client"
import { auth } from "@/auth/firebase"
import { toastError, toastSuccess, toastWarn, } from "@/helpers/ToastNotify"
import { EmailAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, reauthenticateWithCredential, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updatePassword, updateProfile } from "firebase/auth"
import { useRouter, useSearchParams } from "next/navigation"
// next.js projesinde reaccta ait hookk kullanacaksak use client yazmaliyiz.

import { createContext, useEffect, useState } from "react"


export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {

  const [currentUser, setCurrrentUser] = useState('')
  const [loading, setLoading] = useState(true)

  //nextjs in navigasyon hooku
  const router = useRouter()



  // new User

  const createUser = async (email, password, displayName, redirectTo="/") => {

    try {

      await createUserWithEmailAndPassword(auth, email, password)

      await updateProfile(auth.currentUser, {
        displayName,
      })

      toastSuccess(`Welcome ${displayName}`)
      router.push(redirectTo)

    } catch (error) {
      toastError(error.message)
    }

  }



  const login = async (email, password, redirectTo = "/") => {

    try {

      await signInWithEmailAndPassword(auth, email, password);
      router.push(redirectTo);
      toastSuccess("Logged in Successfully");
    } catch (error) {
      toastError("Something went wrong. Please try again.");
    }
  };



  const signUpWithGoogle = async (redirectTo="/") => {

    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider)
      router.push(redirectTo);
      toastSuccess("Logged in Successfully");
      console.log(currentUser)

    } catch (error) {
      toastError("Something went wrong. Please try again.")
    }
  }


  const logout = async () => {

    try {
      router.push("/");
      await signOut(auth);
      toastSuccess("logout is successfully");
    } catch (error) {
      toastError(error.message);
    }

  };


  const forgotPassword = async (email) => {

    if (!email) {
      toastError("Please enter a Email")
    } else {
      try {

        await sendPasswordResetEmail(auth, email)
        toastWarn("Please check your Email.")

      } catch (error) {
        toastError(error.message);
      }
    }

  };


  const updateUserProfile = async (displayName, photoURL) => {
    try {
      await updateProfile(auth.currentUser, { displayName, photoURL })
      setCurrrentUser((prev) => ({ ...prev, displayName, photoURL }))
      toastSuccess("Profile updated successfully.")
    } catch (error) {
      toastError(error.message)
    }
  };


  const changeUserPassword = async (currentPassword, newPassword) => {
    try {
      const credential = EmailAuthProvider.credential(auth.currentUser.email, currentPassword)
      await reauthenticateWithCredential(auth.currentUser, credential)
      await updatePassword(auth.currentUser, newPassword)
      toastSuccess("Password updated successfully.")
    } catch (error) {
      toastError(error.message)
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

      setLoading(false)

    })
  }

  useEffect(() => {
    userChanged()
  }, [])


  return (
    <AuthContext.Provider value={{ createUser, currentUser, loading, signUpWithGoogle, login, logout, forgotPassword, updateUserProfile, changeUserPassword }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
