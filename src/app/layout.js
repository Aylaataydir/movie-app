import AuthContextProvider from "@/context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



export const metadata = {
  title: "Movie App",
  description: "A movie platform",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthContextProvider>
          {children}
          <ToastContainer />
        </AuthContextProvider>
      </body>
    </html>
  );
}
