/** @jsxRuntime classic */
/** @jsx jsx */
import { Box, Flex, jsx, Text, ThemeUIStyleObject } from "theme-ui";

const style: Record<string, ThemeUIStyleObject> = {
    projectHeader: {
        variant: "styles.header.app",
        backgroundColor: "#00A8E0",
        height: "48px",
        paddingTop: 1,
        paddingLeft: 1
    }
};

const HeaderDivider = () => {
    return (
        <Box
            sx={{ ...style.projectHeader }}
        />
    );
};

const TaskHeader = () => (
    <Flex sx={style.projectHeader}>
        <Flex sx={{ variant: "styles.header.left" }}>
            <HeaderDivider />
            <Text as="h1" sx={{ variant: "styles.header.title", m: 0 }}>
                Valid8
            </Text>
        </Flex>
    </Flex>
);

export default TaskHeader;