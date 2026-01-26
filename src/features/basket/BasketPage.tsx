import { useEffect, useState } from "react";
import { Basket } from "../../app/models/basket";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import {
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

export default function BasketPage() {
    const [loading, setLoading] = useState(true);
    const [basket, setBasket] = useState<Basket | null>(null);

    useEffect(() => {
        agent.Basket.get()
            .then(basket => setBasket(basket))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <LoadingComponent message="Loading basket..." />;

    if (!basket || basket.items.length === 0)
        return <Typography>Your basket is empty</Typography>;

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="center">Quantity</TableCell>
                        <TableCell align="right">Subtotal</TableCell>
                        <TableCell /> {/* cột actions */}
                    </TableRow>
                </TableHead>

                <TableBody>
                    {basket.items.map(item => (
                        <TableRow key={item.productId}>
                            <TableCell>{item.name}</TableCell>

                            <TableCell align="right">
                                ${(item.price / 100).toFixed(2)}
                            </TableCell>

                            <TableCell align="center">
                                {item.quantity}
                            </TableCell>

                            <TableCell align="right">
                                ${((item.price / 100) * item.quantity).toFixed(2)}
                            </TableCell>

                            <TableCell align="right">
                                <IconButton color="error">
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
