import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { useHistory, useLocation } from "react-router-dom";

export default function ServerError() {
    const history = useHistory();
    const {state} = useLocation<any>();

    return (
        <Container component={Paper}>
            {state?.error ? (
                <>
                    <Typography variant="h6" gutterBottom>Server Error</Typography>
                    <Divider/>
                    <Typography>{state.error.details || "Internal server error"}</Typography>
                </>
            ) : (
                <Typography variant="h5" gutterBottom>No error information available</Typography>
            )}
            <Button onClick={() => history.push("/catalog")}>Go Home</Button>
        </Container>
    )
}