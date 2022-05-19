/** @jsxRuntime classic */
/** @jsx jsx */
import { Box, Card, Heading, Link, jsx } from "theme-ui";

import CenteredContent from "../components/CenteredContent";

const HomeScreen = () => {
    return (
        <CenteredContent>
            <Card sx={{ variant: "cards.floating", mb: 5 }}>
                <Heading as="h2" sx={{ fontSize: 4, mb: 20, textAlign: "left", fontFamily: "heading" }}>
                    Valid8 : Home
                </Heading>
                <Box sx={{ fontSize: 1, mt: 3, textAlign: "left", fontFamily: "body" }}>
                    <Link href="task">Tasks</Link>
                </Box>
            </Card>
        </CenteredContent>
    );
};

export default HomeScreen;