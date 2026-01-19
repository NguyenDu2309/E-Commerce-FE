import { useEffect, useState } from "react";
import { Product } from "../../app/models/products";
import ProductList from "./ProductList";
import agent from "../../app/api/agent";

export default function Catalog() {
    const [products, setProducts] = useState<Product[]>([]);
    
    useEffect(() => {
        agent.Catalog.list<Product[]>().then(data => setProducts(data));
    }, []);
    return (
      <>
        <ProductList products={products} />
      </>
    );
  }
