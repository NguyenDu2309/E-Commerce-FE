import React, { useEffect } from "react";
import { useState } from "react";
import { Product } from "./products";

function App() {
   const [products, setProducts] = useState<Product[]>([]);

   useEffect(() => {
      fetch('http://localhost:5248/api/products')
         .then(response => response.json())
         .then(data => setProducts(data))
         .catch(error => console.error('Error fetching products:', error));
   }, []);

   function addProduct(name: string, price: number) 
   {
      setProducts(prevState => [...prevState, 
         { 
            id: prevState.length + 1,
            name: "Monitor" + prevState.length + 1, 
            price: (prevState.length * 100) + 100,
            description: "A high-resolution monitor",
            pictureUrl: "http://example.com/monitor.jpg",
            type: "Electronics",
            brand: "Generic",
            quantityInStock: 50
         }]);
   }
   return (
      <div>
         <h1 style={{ color: 'red' }}>Re-Store</h1>
         <ul>
            {products.map(product => (
               <li key={product.id}>
                  {product.name}: ${product.price}
               </li>
            ))}
         </ul>
         <button onClick={() => addProduct("Monitor", 399)}>Add Monitor</button>
      </div>
   );
}

export default App;
