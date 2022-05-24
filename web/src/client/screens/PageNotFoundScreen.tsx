/** @jsxRuntime classic */
/** @jsx jsx */
import { Box, Card, Heading, Link, jsx } from "theme-ui";

import CenteredContent from "../components/CenteredContent";

const PageNotFoundScreen = () => {
    return (
        <CenteredContent>
            <Card sx={{ variant: "cards.floating", mb: 5 }}>
                <Heading as="h2" sx={{ fontSize: 4, mb: 20, textAlign: "left" }}>
                    Page not found!
                </Heading>
                <Link href="/">Home</Link>
            </Card>
        </CenteredContent>
    );
};

export default PageNotFoundScreen;