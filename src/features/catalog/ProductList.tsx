import { Product } from "../../app/models/products";
import ProductCard from "./ProductCard";
import { Box, Container } from "@mui/material";

interface Props {
    products: Product[];
}

export default function ProductList({ products }: Props) {
    return (
        <Container maxWidth="xl">
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: 'repeat(1, 1fr)',
                        sm: 'repeat(2, 1fr)',
                        md: 'repeat(3, 1fr)',
                        lg: 'repeat(4, 1fr)',
                    },
                    gap: 4,
                    py: 4,
                }}
            >
                {products.map(product => (
                    <Box
                        key={product.id}
                        sx={{
                            transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                            '&:hover': {
                                transform: 'translateY(-8px)',
                            }
                        }}
                    >
                        <ProductCard product={product} />
                    </Box>
                ))}
            </Box>
        </Container>
    )
}