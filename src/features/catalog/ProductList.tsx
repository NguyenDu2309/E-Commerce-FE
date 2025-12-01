import { Product } from "../../app/models/products";
import ProductCard from "./ProductCard";
import Grid from "@mui/material/Grid";

interface Props {
    products: Product[];
}

export default function ProductList({ products }: Props) {
    return (
        <Grid container spacing={4}>
            {products.map(product => (
                <Grid>
                    <ProductCard key={product.id} product={product} />
                </Grid>
            ))}
        </Grid>
    )
}