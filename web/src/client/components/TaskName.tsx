/** @jsxRuntime classic */
/** @jsx jsx */
import React from "react";
import { Flex, Text, jsx, ThemeUIStyleObject } from "theme-ui";

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