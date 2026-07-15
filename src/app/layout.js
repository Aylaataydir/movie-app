import AuthContextProvider from "@/context/AuthContext";
import MovieContextProvider from "@/context/MovieContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css'
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Movie App",
  description: "A movie platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthContextProvider>
          <MovieContextProvider>
            <Navbar />
            {children}
            <ToastContainer />
          </MovieContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
