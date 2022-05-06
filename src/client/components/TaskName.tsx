/** @jsxRuntime classic */
/** @jsx jsx */
import React, { Fragment, memo, useEffect, useState } from "react";
import { Box, Button, Flex, Text, jsx, Themed, ThemeUIStyleObject } from "theme-ui";

import { ITask } from "../../shared/entities";

const style: Record<string, ThemeUIStyleObject> = {
    wrapper: {
        color: "muted",
        alignItems: "center"
    }
};

const TaskName = ({
    task
}: {
    readonly task: ITask
}) => {
    return (
        <Flex sx={style.wrapper}>
            <React.Fragment>
                <Text as="h1" sx={{ variant: "styles.header.title", m: 0 }}>
                    {`Task: ${task.id}`}
                </Text>
            </React.Fragment>
        </Flex>
    )
}

export default TaskName;