/** @jsxRuntime classic */
/** @jsx jsx */
import React, { Fragment, memo, useEffect, useState } from "react";
import { Box, Button, Flex, jsx, Themed, ThemeUIStyleObject } from "theme-ui";
import { heights } from "../theme";
import { ITask } from "../../shared/entities";
import TaskName from "../components/TaskName";

const style: Record<string, ThemeUIStyleObject> = {
    projectHeader: {
        variant: "styles.header.app",
        backgroundColor: "#00A8E0"
        // borderBottom: "1px solid",
        // borderColor: "white"
    }
};

const HeaderDivider = () => {
    return (
        <Box
            sx={{
                marginLeft: 1,
                paddingLeft: 1,
                height: heights.header
                // borderLeft: "1px solid rgba(255, 255, 255, 0.25)"
            }}
        />
    );
};

const TaskHeader = ({
    task
}: {
    readonly task?: ITask
}) => (
    <Flex sx={style.projectHeader}>
        <Flex sx={{ variant: "styles.header.left" }}>
            {/* <Link></Link> */}
            <HeaderDivider />
            {task ? <TaskName task={task} /> : "..."}
        </Flex>
        {/* other buttons? */}
    </Flex>
);

export default TaskHeader;