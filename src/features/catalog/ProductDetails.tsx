import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Grid from "@mui/material/Grid";
import {
  Box,
  Typography,
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Divider,
} from "@mui/material";

import { Product } from "../../app/models/products";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5248/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Typography variant="h2">Loading...</Typography>;
  if (!product) return <Typography variant="h2">Product not found</Typography>;

  return (
    <Grid container spacing={6}>
      {/* IMAGE */}
      <Grid item xs={12} md={6} component="div">
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
      </Grid>

      {/* DETAILS */}
      <Grid item xs={12} md={6} component="div">
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
        </Paper>
      </Grid>
    </Grid>
  );
}
