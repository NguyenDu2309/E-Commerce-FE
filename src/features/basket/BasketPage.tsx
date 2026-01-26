import {
    Box,
    Button,
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
import { Add, Remove } from "@mui/icons-material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useStoreContext } from "../../app/context/StoreContext";
import { useState } from "react";
import agent from "../../app/api/agent";

export default function BasketPage() {
    const {basket, setBasket, removeItem} = useStoreContext();
    const [status, setStatus] = useState({
        loading: false,
        name: ''
    });

    function handleAddItem(productId: number, name: string) {
        setStatus({loading: true, name});
        agent.Basket.addItem(productId)
            .then(basket => setBasket(basket))
            .catch(error => console.log(error))
            .finally(() => setStatus({loading: false, name: ''}));
    }

    function handleRemoveItem(productId: number, quantity = 1, name: string) {
        setStatus({loading: true, name: ''});
        agent.Basket.removeItem(productId, quantity)
            .then(() => removeItem(productId, quantity))
            .catch(error => console.log(error))
            .finally(() => setStatus({loading: false, name: ''}));
    }

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
                        <TableRow 
                            key={item.productId} 
                            sx={{ '&:last-child td, &:last-child th': {border: 0} }}>
                            <TableCell component="th" scope="row">
                                <Box display='flex' alignItems='center'>
                                    <img src={item.pictureUrl} alt={item.name} style={{height: 50, marginRight: 20}} />
                                    <span>{item.name}</span>
                                </Box>
                            </TableCell>

                            <TableCell align="right">
                                ${(item.price / 100).toFixed(2)}
                            </TableCell>

                            <TableCell align="center">
                                <Button 
                                    loading={status.loading && status.name === 'remove' + item.productId} 
                                    onClick={() => handleRemoveItem(item.productId, 1, 'remove' + item.productId)} 
                                    color="error">
                                    <Remove/>
                                </Button>
                                {item.quantity}
                                <Button 
                                    loading={status.loading && status.name === 'add' + item.productId} 
                                    onClick={() => handleAddItem(item.productId, 'add' + item.productId)} 
                                    color="error">
                                    <Add/>
                                </Button>
                            </TableCell>

                            <TableCell align="right">
                                ${((item.price / 100) * item.quantity).toFixed(2)}
                            </TableCell>

                            <TableCell align="right">
                                <Button 
                                    loading={status.loading && status.name === 'remove' + item.productId} 
                                    onClick={() => handleRemoveItem(item.productId, item.quantity, 'remove' + item.productId)} 
                                    color="error">
                                    <DeleteIcon />
                                </Button>
                            </TableCell>
                        </TableRow> 
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
