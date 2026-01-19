import { Alert, AlertTitle, Button, ButtonGroup, Container, List, ListItem, Typography } from "@mui/material";
import agent from "../../app/api/agent";
import { useState } from "react";

export default function AboutPage() {
    const [validationErrors, setValidationErrors] = useState<string[]>([]);

    function getValidationErrors() {
        agent.TestErrors.getValidationError()
            .then(() => console.log("Should not see this"))
            .catch(error => setValidationErrors(error));
    }

    return (
        <Container>
            <Typography variant="h3" gutterBottom>
                About Re-Store
            </Typography>
            <ButtonGroup>
                <Button variant="contained" onClick={() => agent.TestErrors.get400Error().catch(error => console.log(error))}>TestErrors</Button>
                <Button variant="contained" onClick={() => agent.TestErrors.get401Error().catch(error => console.log(error))}>TestErrors</Button>
                <Button variant="contained" onClick={() => agent.TestErrors.get404Error().catch(error => console.log(error))}>TestErrors</Button>
                <Button variant="contained" onClick={() => agent.TestErrors.get500Error().catch(error => console.log(error))}>TestErrors</Button>
                <Button variant="contained" onClick={() => agent.TestErrors.getValidationError().catch(error => console.log(error))}>TestErrors</Button>
                <Button variant="contained" onClick={getValidationErrors}>Get Validation Errors</Button>
            </ButtonGroup>
            {validationErrors.length > 0 &&
                <Alert severity="error">
                    <AlertTitle>Validation Errors</AlertTitle>
                    <List>
                        {validationErrors.map((error, i) => (
                            <ListItem key={i}>{error}</ListItem>
                        ))}
                    </List>
                </Alert>
            }
        </Container>
    );
}