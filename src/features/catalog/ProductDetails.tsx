import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  Box,
  Typography,
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Divider,
  Grid,
  TextField,
  Button,
} from "@mui/material";

import { Product } from "../../app/models/products";
import agent from "../../app/api/agent";
import NotFound from "../../app/error/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useStoreContext } from "../../app/context/StoreContext";

export default function ProductDetails() {
  const {basket, setBasket, removeItem} = useStoreContext();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [subbmitting, setSubmitting] = useState(false);
  const item = basket?.items.find(i => i.productId === product?.id);

  useEffect(() => {
    if (item) setQuantity(item.quantity);
    agent.Catalog.details(parseInt(id!))
      .then((res) => setProduct(res))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id, item]);

  function handleInputChange(event: any) {
    const value = Math.max(0, Math.min(100, Number(event.target.value)));
    setQuantity(value);
  }

  function handleUpdateCart() {
    setSubmitting(true);
    if(!item || quantity > item.quantity) {
      const updatedQuantity = item ? quantity - item.quantity : quantity;
      agent.Basket.addItem(product?.id!, updatedQuantity)
      .then(basket => setBasket(basket))
      .catch(err => console.error(err))
      .finally(() => setSubmitting(false));
    } else {
      const updatedQuantity = item.quantity - quantity;
      agent.Basket.removeItem(product?.id!, updatedQuantity)
      .then(() => removeItem(product?.id!, updatedQuantity))
      .catch(err => console.error(err))
      .finally(() => setSubmitting(false));
    }
  }

  if (loading) return <LoadingComponent message="Loading product..."/>
  if (!product) return <NotFound />;

  return (
    <Box sx={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
      {/* IMAGE */}
      <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 45%" } }}>
        <Paper
          elevation={3}
          sx={{
            p: 3,
            borderRadius: 3,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            component="img"
            src={product.pictureUrl}
            alt={product.name}
            sx={{
              width: "100%",
              maxWidth: 420,
              borderRadius: 2,
            }}
          />
        </Paper>
      </Box>

      {/* DETAILS */}
      <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 45%" } }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h4" fontWeight="bold">
            {product.name}
          </Typography>

          <Typography
            variant="h5"
            color="secondary"
            sx={{ mt: 1, mb: 3 }}
          >
            ${(product.price / 100).toFixed(2)}
          </Typography>

          <Divider sx={{ mb: 2 }} />

          <TableContainer>
            <TableBody>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Name
                </TableCell>
                <TableCell>{product.name}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Description
                </TableCell>
                <TableCell>{product.description}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Type
                </TableCell>
                <TableCell>{product.type}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Brand
                </TableCell>
                <TableCell>{product.brand}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Quantity in stock
                </TableCell>
                <TableCell>{product.quantityInStock}</TableCell>
              </TableRow>
            </TableBody>
          </TableContainer>
          <Grid container spacing={2} sx={{ mt: 3 }}>
            <Grid>
              <TextField 
                onChange={handleInputChange}
                variant="outlined"
                type="number"
                label="Quantity in basket"
                fullWidth
                value={quantity}
                />
            </Grid>
            <Grid>
              <Button 
                disabled={item?.quantity === quantity || !item && quantity === 0}
                loading={loading}
                onClick={handleUpdateCart}
                sx = {{height: '55px'}}
                variant="contained" 
                color="primary" 
                size="large"
                fullWidth
              >
                {item ? 'Update Quantity' : 'Add to Basket'}
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
}