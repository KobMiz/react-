import React, { useState, useEffect } from "react";
import "./styles/App.css";
import "./styles/pagination.css";
import "./styles/CardDetail.css";
import "./styles/About.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./contexts/auth.context";
import ProtectedRoute from "./components/ProtectedRoute";
import usersService from "./services/usersService";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/home";
import About from "./pages/about";
import SignUp from "./pages/signup";
import Signin from "./pages/signin";
import Logout from "./pages/logout";
import BizSignup from "./pages/bizSignup";
import CreateCard from "./pages/createCard";
import MyCards from "./pages/myCards";
import EditCard from "./pages/editCard";
import CardDetail from "./pages/cardDetail";
import FavoriteCards from "./pages/favoriteCards";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  useEffect(() => {
    const currentUser = usersService.getUser();
    setUser(currentUser);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  
  return (
    <AuthProvider>
      <header>
        <Navbar
          toggleDarkMode={toggleDarkMode}
          isDarkMode={isDarkMode}
          user={user}
          onSearch={handleSearch}
        />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home searchQuery={searchQuery} />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/biz-signup" element={<BizSignup />} />
          <Route path="/cards/:id" element={<CardDetail />} />
          <Route
            path="/favorite-cards"
            element={<FavoriteCards searchQuery={searchQuery} />}
          />{" "}
          <Route
            path="/my-cards"
            element={
              <ProtectedRoute onlyBiz={true}>
                <MyCards searchQuery={searchQuery} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-card"
            element={
              <ProtectedRoute onlyBiz={true}>
                <CreateCard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-card/:id"
            element={
              <ProtectedRoute onlyBiz={true}>
                <EditCard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
      <ToastContainer />
    </AuthProvider>
  );
}

export default App;
