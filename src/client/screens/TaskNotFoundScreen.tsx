/** @jsxRuntime classic */
/** @jsx jsx */
import { Box, Card, Heading, Link, jsx } from "theme-ui";

import CenteredContent from "../components/CenteredContent";

const PageNotFoundScreen = ({
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
                    Page not found!
                </Heading>
                <Box sx={{ fontSize: 1, mt: 3, textAlign: "left" }}>
                    The {model} (id {id}) that you are looking for could not be found.
                </Box>
                <Box sx={{ fontSize: 1, mt: 3, textAlign: "left" }}>
                    <Link href="/">Home</Link>
                </Box>
            </Card>
        </CenteredContent>
    );
};

export default PageNotFoundScreen;