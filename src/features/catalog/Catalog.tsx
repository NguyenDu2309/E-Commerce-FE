import { useEffect, useState } from "react";
import { Product } from "../../app/models/products";
import ProductList from "./ProductList";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import NotFound from "../../app/error/NotFound";

export default function Catalog() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        agent.Catalog.list<Product[]>()
        .then(data => setProducts(data))
        .catch(error => console.log(error))
        .finally(() => setLoading(false));
    }, []);

    if (loading) return <LoadingComponent message="Loading products..." />;

    if(!products) return <NotFound/>

    return (
      <>
        <ProductList products={products} />
      </>
    );
  }
