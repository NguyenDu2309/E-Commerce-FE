import React, { useEffect } from "react";
import { useState } from "react";
import { Product } from "../models/products";
import Catalog from "../../features/catalog/Catalog";
import Typography from '@mui/material/Typography';


function App() {
   const [products, setProducts] = useState<Product[]>([]);

   useEffect(() => {
      fetch('http://localhost:5248/api/products')
         .then(response => response.json())
         .then(data => setProducts(data))
         .catch(error => console.error('Error fetching products:', error));
   }, []);

   function addProduct() 
   {
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
   return (
      <div>
         <Typography variant="h1">Re-Store</Typography> 
         <Catalog products = {products} addProduct={addProduct} />
      </div>
   );
}

export default App;
