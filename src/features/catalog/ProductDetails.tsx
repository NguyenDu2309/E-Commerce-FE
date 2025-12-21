import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Product } from "../../app/models/products";
export default function ProductDetails() {  
    const {id} = useParams<{id: string}>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:5248/api/products/${id}`)
          .then(response => {
            setProduct(response.data);
          })
          .catch(error => {
            console.log(error);
          })
          .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <Typography variant="h2">Loading...</Typography>;
    if (!product) return <Typography variant="h2">Product not found</Typography>;

    return (
        <Typography variant="h2">
            {product.name}
        </Typography>
    );
}