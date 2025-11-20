import React from "react";
import { useState } from "react";

function App() {
   const [products, setProducts] = useState([
      { name: 'Laptop', price: 999 },
      { name: 'Smartphone', price: 699 },
      { name: 'Tablet', price: 499 },
   ]);
   function addProduct(name: string, price: number) {
      setProducts(prevState => [...prevState, { name: "Monitor" + prevState.length + 1, price: (prevState.length * 100) + 100 }]);
   }
   return (
      <div>
         <h1 style={{ color: 'red' }}>Re-Store</h1>
         <ul>
            {products.map((item, index) => (
               <li key={index}>
                  {item.name}: ${item.price}
               </li>
            ))}
         </ul>
         <button onClick={() => addProduct("Monitor", 399)}>Add Monitor</button>
      </div>
   );
}

export default App;
