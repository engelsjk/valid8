/** @jsxRuntime classic */
/** @jsx jsx */
import { Box, Card, Heading, jsx } from "theme-ui";

import CenteredContent from "../components/CenteredContent";

const ErrorScreen = ({
    model,
    id
}: {
    readonly model: string,
    readonly id?: string
}) => {
    return (
        <CenteredContent>
            <Card sx={{ variant: "cards.floating", mb: 5 }}>
                <Heading as="h2" sx={{ fontSize: 4, mb: 20, textAlign: "left" }}>
                    Error!
                </Heading>
                <Box sx={{ fontSize: 1, mt: 3, textAlign: "left" }}>
                    The {model} (id {id}) has some kind of error.
                </Box>
            </Card>
        </CenteredContent>
    );
};

export default ErrorScreen;