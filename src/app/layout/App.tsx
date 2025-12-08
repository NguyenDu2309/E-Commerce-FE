import React, { useEffect } from "react";
import { useState } from "react";
import { Product } from "../models/products";
import Catalog from "../../features/catalog/Catalog";
import Header from "./Header";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material";


function App() {

   const [darkMode, setDarkMode] = useState(false);
   const palleteType = darkMode ? 'dark' : 'light';
   const theme = createTheme({
      palette: {
         mode: palleteType,
         background: {
            default: palleteType === 'light' ? '#eaeaea' : '#121212'
         }
      }
   });

   const [products, setProducts] = useState<Product[]>([]);

   useEffect(() => {
      fetch('http://localhost:5248/api/products')
         .then(response => response.json())
         .then(data => setProducts(data))
         .catch(error => console.error('Error fetching products:', error));
   }, []);

   function addProduct() {
      setProducts(prevState => [...prevState,
      {
         id: prevState.length + 1,
         name: "Monitor" + prevState.length + 1,
         price: (prevState.length * 100) + 100,
         description: "A high-resolution monitor",
         pictureUrl: "images/hero1.jpg",
         type: "Electronics",
         brand: "Generic",
         quantityInStock: 50
      }]);
   }

   function handleThemeChange() {
      setDarkMode(!darkMode);
   }

   return (
      <ThemeProvider theme={theme}>
         <CssBaseline />
         <Header darkMode={darkMode} handleThemeChange={handleThemeChange}/>
         <Container>
            <Catalog products={products} addProduct={addProduct} />
         </Container>
      </ThemeProvider>

   );
}

export default App;
