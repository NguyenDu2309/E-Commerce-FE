import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import { Product } from "../../app/models/products";

interface Props {
    product: Product;
}

export default function ProductCard({product}: Props) {
    return (
        <ListItem key={product.id}>
            <ListItemAvatar>
                <Avatar src={product.pictureUrl} />
            </ListItemAvatar>
            <ListItemText>
                {product.name} - ${product.price}
            </ListItemText>
        </ListItem>
    )
}