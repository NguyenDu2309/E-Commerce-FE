import React, { useEffect, useState } from "react";
import { Product } from "../models/products";
import Catalog from "../../features/catalog/Catalog";
import Header from "./Header";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "../../features/home/HomePage";
import ProductDetails from "../../features/catalog/ProductDetails";
import AboutPage from "../../features/about/AboutPage";
import ContactPage from "../../features/contact/ContactPage";

function App() {

  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? "dark" : "light";

  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === "light" ? "#eaeaea" : "#121212"
      }
    }
  });

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:5248/api/products")
      .then(res => {
        if (!res.ok) throw new Error("API error");
        return res.json();
      })
      .then(data => setProducts(data))
      .catch(err => console.error("Fetch products failed:", err));
  }, []);

  function handleThemeChange() {
    setDarkMode(prev => !prev);
  }

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar />
      <Header
        darkMode={darkMode}
        handleThemeChange={handleThemeChange}
      />
      <Container>
        <Routes>
          <Route path='/' Component={HomePage} />
          <Route path='/catalog' Component={Catalog} />
          <Route path='/catalog/:id' Component={ProductDetails} />
          <Route path='/about' Component={AboutPage} />
          <Route path='/contact' Component={ContactPage} />
        </Routes>
      </Container>
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
