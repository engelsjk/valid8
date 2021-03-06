/** @jsxRuntime classic */
/** @jsx jsx */
import { Box, Card, Heading, Link, jsx } from "theme-ui";

import CenteredContent from "../components/CenteredContent";

const TasksScreen = () => {
    return (
        <CenteredContent>
            <Card sx={{ variant: "cards.floating", mb: 5 }}>
                <Heading as="h2" sx={{ fontSize: 4, mb: 20, textAlign: "left" }}>
                    Valid8 : Tasks
                </Heading>
                <Box sx={{ fontSize: 1, mt: 3, textAlign: "left" }}>
                    <ul>
                        <li><Link href="/tasks/buildings">Buildings</Link></li>
                        <li><Link href="/">Back</Link></li>
                    </ul>
                </Box>
            </Card>
        </CenteredContent>
    );
};

export default TasksScreen;