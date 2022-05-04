/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useEffect, useState } from "react";
import { Flex, Box, Label, Button, jsx, Select, Slider, Text, ThemeUIStyleObject } from "theme-ui";

const style: Record<string, ThemeUIStyleObject> = {
    header: {
        variant: "styles.header.app",
        backgroundColor: "black",
        color: "white",
        alignItems: "center",
        justifyContent: "space-between",
        px: 2,
        py: 1,
        height: "50px"
    },
    taskLabel: {
        paddingLeft: "5px"
    },
    submitButton: {
        color: "black",
        fontWeight: "bold"
    }
};

const TaskHeader = ({
    label,
    readyToSubmit,
}: {
    readonly label?: string;
    readonly readyToSubmit: boolean;
}) => {
    return (
        <Flex sx={style.header}>
            <Flex sx={{ flex: 1 }}>
                <strong>INSTRUCTIONS:</strong><span sx={style.taskLabel}>{label}</span>
            </Flex>
            {readyToSubmit &&
                <button sx={style.submitButton}>
                    <span>Submit</span>
                </button>
            }
        </Flex>
    );
};

export default TaskHeader;