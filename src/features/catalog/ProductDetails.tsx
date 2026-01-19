import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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
import agent from "../../app/api/agent";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    agent.Catalog.details<Product>(parseInt(id!))
      .then((res) => setProduct(res))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Typography variant="h2">Loading...</Typography>;
  if (!product) return <Typography variant="h2">Product not found</Typography>;

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
        </Paper>
      </Box>
    </Box>
  );
}