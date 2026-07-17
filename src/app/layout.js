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
    <html lang="en" data-theme="dark">
      <body>
        <AuthContextProvider>
          <MovieContextProvider>
            <Navbar />
            <main className="mx-auto w-full max-w-360">
              {children}
            </main>
            <ToastContainer
              theme="dark"
              position="top-right"
              newestOnTop
              toastClassName="app-toast"
            />
          </MovieContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
