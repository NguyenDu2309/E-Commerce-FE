import { Badge, IconButton, List, ListItem, Switch } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";

interface Props{
  darkMode: boolean;
  handleThemeChange: () => void;
}

const midLinks = [
  { title: 'catalog', path: '/catalog' },
  { title: 'about', path: '/about' },
  { title: 'contact', path: '/contact' }
]

const rightLinks = [
  { title: 'login', path: '/login' },
  { title: 'register', path: '/register' }
]

export default function Header({darkMode, handleThemeChange}: Props) {
  return (
    <AppBar position="static" sx={{mb: 4}}>
        <Toolbar>
            <Typography variant="h6" component={NavLink} to='/' sx={{color: 'inherit'}}>
                Re-Store
            </Typography>
        <Switch checked={darkMode} onChange={handleThemeChange}/>
        <List sx={{display: "flex"}}>
          {midLinks.map(({title, path}) => (
            <ListItem component={NavLink} to={path} key={path} 
              sx={{color: 'inherit', typography: 'h6', '&.active': {color: 'text.secondary'}}}>
              {title.toUpperCase()}
            </ListItem>
          ))}
        </List>
        <IconButton size="large" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <Typography>🛒</Typography>
          </Badge>
        </IconButton>
        <List sx={{display: "flex"}}>
          {rightLinks.map(({title, path}) => (
            <ListItem component={NavLink} to={path} key={path} 
              sx={{color: 'inherit', typography: 'h6', '&.active': {color: 'text.secondary'}}}>
              {title.toUpperCase()}
            </ListItem>
          ))}
        </List>
        </Toolbar>
    </AppBar>
  );
}