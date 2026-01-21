import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";

interface Props{
    message?: string;
}

export default function LoadingComponent({message}: Props) {
    return (
        <Backdrop open={true} invisible={true}>
            <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
                <CircularProgress size={100} color="secondary"/>
                <Typography variant="h4" sx={{justifyContent: 'center', position: 'fixed', top: '60%'}}>{message || "Loading..."}</Typography>
            </Box>
        </Backdrop>
    )
}