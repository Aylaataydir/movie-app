'use client'


import { AuthContext } from '@/context/AuthContext';
import { usePathname, useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import Link from 'next/link'

import { TiThMenu } from 'react-icons/ti'
import Search from './Search';


const Navbar = () => {

    const [theme, setTheme] = useState("dark")
    const { currentUser, logout } = useContext(AuthContext)

    const router = useRouter()
    const pathName = usePathname()



    const isActive = (path) => pathName === path

    const toggleUserLogin = async () => {

        if (currentUser) {
            try {
                await logout();
            } catch (error) {
                console.log("Failed to log out:", error)
            }
        } else {
            router.push("/login")
        }

    }

    const toggleTheme = () => {
        setTheme(prev => prev === "light" ? "dark" : "light")
    }

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/watchlist", label: "Watchlist" },
        { href: "/watched", label: "Watched" },
        { href: "/favorites", label: "Favorites" },
    ]


    return (
        <div className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/80 backdrop-blur-md">
            <div className="navbar mx-auto max-w-7xl px-4 md:px-10">
                <div className="navbar-start gap-2">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <TiThMenu className='text-2xl' />
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content z-1 mt-3 w-64 gap-1 rounded-box bg-neutral-900 p-3 shadow-2xl ring-1 ring-white/10">
                            <li className="mb-1">
                                <Search />
                            </li>
                            {navLinks.map(link => (
                                <li key={link.href} className='nav-link'>
                                    <Link
                                        href={link.href}
                                        className={isActive(link.href) ? "text-orange-500" : ""}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                            <li className='nav-link'>
                                <button
                                    onClick={toggleUserLogin}
                                    className='navbar-login-btn ms-2 cursor-pointer'>
                                    {currentUser ? "Log out" : "Login"}
                                </button>
                            </li>
                        </ul>
                    </div>
                    <Link href="/" className="site-logo btn btn-ghost text-xl">MOVIE APP</Link>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal gap-6 px-1">
                        {navLinks.map(link => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className={`relative font-medium text-neutral-300 transition-colors hover:text-white after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:rounded-full after:bg-orange-500 after:transition-all after:duration-300 ${isActive(link.href)
                                        ? "text-white after:w-full"
                                        : "after:w-0 hover:after:w-full"
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="navbar-end gap-2 md:gap-4">
                  

                    {/* THEME */}
                    <label
                        onClick={toggleTheme}
                        className="flex cursor-pointer gap-2 scale-75">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20" height="20" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" strokeWidth="2"
                            strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                        </svg>
                        <input type="checkbox" value="synthwave" className="toggle theme-controller" />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20" height="20" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" strokeWidth="2"
                            strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="5" />
                            <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                        </svg>
                    </label>

                    {currentUser &&
                        <div className="avatar flex items-center space-x-2">
                            <p className='hidden text-sm md:block'>{currentUser?.displayName}</p>
                            <div className="ring- ring-offset-base-100 w-7 rounded-full ring-1 ring-offset-2">
                                <img src="https://muratyurtoglu.com/wp-content/uploads/bos-profil-resmi.jpg" />
                            </div>
                        </div>
                    }

                    <button
                        onClick={toggleUserLogin}
                        className='navbar-login-btn hidden cursor-pointer lg:flex'>
                        {currentUser ? "Log out" : "Login"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Navbar
