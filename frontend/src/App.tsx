import { Route, Routes } from "react-router";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ContactUs from "./pages/ContactUs";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Profile from "./pages/Profile";
import Teams from "./pages/Teams";
import PageNotFound from "./pages/PageNotFound";
import { AuthProvider } from "./components/AuthContext";
import Footer from "./components/Footer";

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/teams" element={<Teams />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </AuthProvider>
  );
}

export default App;
