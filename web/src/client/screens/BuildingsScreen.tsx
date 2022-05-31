/** @jsxRuntime classic */
/** @jsx jsx */
import { useRef, useEffect, useState } from "react";
import { Box, Card, Heading, Input, jsx } from "theme-ui";
import { useNavigate } from "react-router-dom";

import CenteredContent from "../components/CenteredContent";




const BuildingsScreen = () => {

    const [taskID, setTaskID] = useState("unknown");

    let navigate = useNavigate();
    const keyUpHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.code === "Enter" || event.code === "NumpadEnter") {
            navigate(`/tasks/buildings/${taskID}`);
        }
    };

    return (
        <CenteredContent>
            <Card sx={{ variant: "cards.floating", mb: 5 }}>
                <Heading as="h2" sx={{ fontSize: 4, mb: 20, textAlign: "left" }}>
                    Valid8 : Tasks : Buildings
                </Heading>
                <Box sx={{ fontSize: 1, mt: 3, textAlign: "left" }}>
                    Task ID <Input
                        sx={{ width: "500px" }}
                        onChange={e => setTaskID(e.target.value)}
                        onKeyUp={keyUpHandler}
                    />
                </Box>
            </Card>
        </CenteredContent>
    );
};

export default BuildingsScreen;