'use client'

import { useContext, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AuthContext } from '@/context/AuthContext'

const Signup = () => {

    const router = useRouter()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    // Context'ten fonksiyonları alıyoruz
    const { createUser, signUpWithGoogle } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault()
        createUser(email, password, name)
    }

    return (
        <div className='border border-white/10 w-lg mt-4 pb-12 rounded-lg mx-auto'>
            <div className="flex min-h-full flex-col justify-center px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight">Sign Up</h2>
                </div>
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form
                        onSubmit={handleSubmit}
                        action="#"
                        method="POST"
                        className="space-y-6">

                        <div>
                            <label htmlFor="name" className="block text-sm/6 font-medium text-gray-10">
                                Name
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={(e) => setName(e.target.value)}
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    autoComplete="name"
                                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base  outline-1 -outline-offset-1 outline-white/10  dark:outline-gray-500 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-10">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={(e) => setEmail(e.target.value)}
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-white/10  dark:outline-gray-500 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-10">
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    onChange={(e) => setPassword(e.target.value)}
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    autoComplete="current-password"
                                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base  outline-1 -outline-offset-1  outline-white/10  dark:outline-gray-500 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 cursor-pointer"
                            >
                                Sign up
                            </button>
                        </div>
                    </form>
                    <button
                        onClick={signUpWithGoogle}
                        className="btn rounded-md bg-white text-black border-[#e5e5e5] w-full mt-3">
                        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                        Login with Google
                    </button>
                </div>
                <div className='text-center mt-8'>
                    Already have an account? <Link className='font-bold underline ms-3' href="/login">Sign In</Link>
                </div>
            </div>
        </div>
    )
}

export default Signup