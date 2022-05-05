/** @jsxRuntime classic */
/** @jsx jsx */
import React, { Fragment, memo, useEffect, useState } from "react";
import { Box, Button, Flex, jsx, Themed, ThemeUIStyleObject } from "theme-ui";

const style: Record<string, ThemeUIStyleObject> = {
    sidebar: {
        flex: 1
    }
}

const TaskSidebar = () => {

    return (
        <Flex
            sx={style.sidebar}
            className="map-sidebar"
        >
            <Box sx={{ overflowY: "auto", flex: 1 }}>
                <Themed.table sx={style.table}>
                    <thead>
                        <Themed.tr>
                            <Themed.th sx={style.th}>
                            </Themed.th>
                            <Themed.th sx={style.th}></Themed.th>
                        </Themed.tr>
                    </thead>
                    <tbody>
                    </tbody>
                </Themed.table>
            </Box>
        </Flex>
    );
};

export default TaskSidebar;