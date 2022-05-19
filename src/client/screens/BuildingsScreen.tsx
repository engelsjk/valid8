/** @jsxRuntime classic */
/** @jsx jsx */
import { Box, Card, Heading, Link, jsx } from "theme-ui";

import CenteredContent from "../components/CenteredContent";

const BuildingsScreen = () => {
    return (
        <CenteredContent>
            <Card sx={{ variant: "cards.floating", mb: 5 }}>
                <Heading as="h2" sx={{ fontSize: 4, mb: 20, textAlign: "left" }}>
                    Valid8 : Tasks : Buildings
                </Heading>
                <Box sx={{ fontSize: 1, mt: 3, textAlign: "left" }}>
                    <Link href="/">Home</Link>
                </Box>
            </Card>
        </CenteredContent>
    );
};

export default BuildingsScreen;