import { Product } from "../../app/models/products";
import Button from "@mui/material/Button";
import ProductList from "./ProductList";

interface Props{
    products: Product[];
    addProduct: () => void;
}

export default function Catalog({products, addProduct}: Props) {
    return (
        <>
            <ProductList products={products} />
            <Button variant="contained" onClick={addProduct}>Add Product</Button>
        </>
    )
}