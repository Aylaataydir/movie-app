import React, { useContext } from 'react'
import { TiThMenu } from "react-icons/ti";
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import MovieContext from '../context/MovieContext';

const Navbar = () => {

    const { setTheme } = useContext(MovieContext)
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate()

    const toggleUserLogin = async () => {

        if (currentUser) {
            try {

                await logout();

            } catch (error) {
                console.log("cikis yapilamadi:", error)
            }

        } else {

            navigate("/Login")
        }

    }

    const toggleTheme = () => {

        setTheme(prev => prev === "light" ? "dark" : "light")

    }


    return (
        <div className='mx-2 md:mx-4 lg:mx-8'>
            <div className="navbar bg-base-100 shadow-sm">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <TiThMenu className='text-2xl' />
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li className='nav-link'><NavLink to="/home">Home</NavLink></li>
                            <li className='nav-link'><NavLink to="/watchlist">Watchlist</NavLink></li>
                            <li className='nav-link'><NavLink to="/watched">Watched</NavLink></li>
                            <li className='nav-link'><NavLink to="/favorites">Favorites</NavLink></li>
                            <li className='nav-link'> <button
                                onClick={toggleUserLogin}
                                className='navbar-login-btn ms-2 cursor-pointer'>{currentUser ? "Log out" : "Login"}
                            </button></li>


                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl ">MOVIE APP</a>
                </div>
                <div className="navbar-center hidden lg:flex ">
                    <ul className="menu menu-horizontal px-1 gap-10">
                        <li><NavLink className={({ isActive }) => isActive ? "border-b" : "border-none"} to="/home">Home</NavLink></li>
                        <li><NavLink
                            className={({ isActive }) => isActive ? "border-b" : "border-none"}
                            to="/watchlist">
                            Watchlist</NavLink></li>
                        <li><NavLink className={({ isActive }) => isActive ? "border-b" : "border-none"} to="/watched">Watched</NavLink></li>
                        <li><NavLink className={({ isActive }) => isActive ? "border-b" : "border-none"} to="/favorites">Favorites</NavLink></li>
                    </ul>
                </div>

                {/* THEME  */}

                <div className="navbar-end space-x-2 md:space-x-4">
                    <label
                        onClick={toggleTheme}
                        className="flex cursor-pointer gap-2 scale-75">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>

                        </svg>
                        <input type="checkbox" value="synthwave" className="toggle theme-controller" />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round">
                            <circle cx="12" cy="12" r="5" />
                            <path
                                d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />

                        </svg>
                    </label>

                    {currentUser &&

                        <div className="avatar flex items-center space-x-2">
                            <p className='text-sm'>{currentUser?.displayName}</p>
                            <div className="ring- ring-offset-base-100 w-7 rounded-full ring-1 ring-offset-2">
                                <img src="https://muratyurtoglu.com/wp-content/uploads/bos-profil-resmi.jpg" />
                            </div>
                        </div>
                    }

                    <button
                        onClick={toggleUserLogin}
                        className='hidden lg:flex navbar-login-btn ms-2 cursor-pointer'>{currentUser ? "Log out" : "Login"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Navbar