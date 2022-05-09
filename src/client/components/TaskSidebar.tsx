/** @jsxRuntime classic */
/** @jsx jsx */
import React, { Fragment, memo, useEffect, useState } from "react";
import { Box, Button, Flex, jsx, Themed, ThemeUIStyleObject } from "theme-ui";

import { saveResultBuilding } from "../api";
import { TaskBuildingData, ResultBuildingData } from "../../shared/entities";

import { ITask, Point } from "../../shared/entities";

const style: Record<string, ThemeUIStyleObject> = {
    sidebar: {
        flex: 1,
        backgroundColor: "white",
        margin: "15px",
        height: "100%",
        overflowY: "auto"
    },
    saveButton: {
        width: "100%",
        height: "65px",
        maxWidth: "400px",
        backgroundColor: "black",
        fontSize: "2em"
    },
    metadataList: {
        fontSize: "1em",
        minWidth: "0",
        listStyleType: "none",
        padding: "0",
        margin: "0",
        overFlowY: "auto"
    }
}

const Instructions = ({ task }: { readonly task?: ITask }) => {
    return (
        <Box
            sx={{ height: "15%", flexDirection: "column" }}
        >
            <div sx={{ height: "100%", display: "inline-block", overflow: "auto" }}>
                <h2 sx={{ margin: "0 0 5px 0" }}>Instructions</h2>
                <span>
                    Locate the building entrance and click on the map to set a moveable marker at that location.
                    After you've set the marker at the right location, you can save your correction.
                </span>
            </div>
        </Box >
    );
};

const Metadata = ({
    task,
    taskData
}: {
    readonly task?: ITask;
    readonly taskData?: TaskBuildingData;
}) => {

    function taskDataList(taskData: TaskBuildingData) {
        return (
            <div sx={{ height: "100%", display: "inline-block", overflow: "auto" }}>
                <h2 sx={{ margin: "0 0 5px 0" }}>Building</h2>
                <ul sx={style.metadataList}>
                    <li><span>CLLI: {taskData['CLLI']}</span></li>
                    <li><span>Street: {taskData['Street.Address']}</span></li>
                    <li><span>City: {taskData['City']}</span></li>
                    <li><span>State: {taskData['State']}</span></li>
                    <li><span>Zip: {taskData['Zip']}</span></li>
                    <li><span>PM&T Region: {taskData['PM&T.Region']}</span></li>
                    <li><span>RE Object: {taskData['RE.Object']}</span></li>
                    <li><span>AOID: {taskData['AOID']}</span></li>
                    <li><span>Company Code: {taskData['Company.Code']}</span></li>
                    <li><span>Legal Entity Name: {taskData['Legal.Entity.Name']}</span></li>
                    <li><span>Owned/Leased.Ind: {taskData['Owned/Leased.Ind']}</span></li>
                    <li><span>Primary Asset Class: {taskData['Primary.Asset.Class']}</span></li>
                    <li><span>Secondary Asset Class: {taskData['Secondary.Asset.Class']}</span></li>
                    <li><span>Property Manager: {taskData['Property.Manager']}</span></li>
                </ul>
            </div >
        )
    }

    return (
        <Box
            sx={{ height: "35%", flexDirection: "column" }}
        >
            {taskData && (
                taskDataList(taskData)
            )}
        </Box>
    );
};

export interface Location {
    lat: number | undefined;
    lon: number | undefined;
}

const LocationDisplay = ({ capturePoint }: { readonly capturePoint?: Point; }) => {
    return (
        <Box
            sx={{ height: "10%", flexDirection: "column" }}
        >
            <div sx={{ height: "100%", display: "inline-block", overflow: "auto" }}>
                <h2 sx={{ margin: "0 0 5px 0" }}>Location</h2>
                {capturePoint && capturePoint.lnglat ? (
                    <span>Point: {capturePoint.lnglat.lat.toFixed(5)}, {capturePoint.lnglat.lng.toFixed(5)}</span>
                ) : <span>???</span>
                }
            </div>
        </Box >
    );
};

const SaveButton = ({
    readyToSave,
    resultData
}: {
    readonly readyToSave: boolean;
    readonly resultData?: ResultBuildingData;
}) => {
    return (
        <Box
            sx={{ height: "10%", flexDirection: "column" }}
        >
            {readyToSave && (
                <Button sx={style.saveButton} onClick={() => saveResultBuilding(resultData)}>
                    <span>Save</span>
                </Button>
            )}
        </Box>
    );
};

const TaskSidebar = ({
    task,
    taskData,
    capturePoint,
    readyToSave,
    resultData
}: {
    readonly task?: ITask;
    readonly taskData?: TaskBuildingData;
    readonly capturePoint?: Point;
    readonly readyToSave: boolean;
    readonly resultData?: ResultBuildingData;
}) => {

    return (
        <Flex
            sx={style.sidebar}
            className="map-sidebar"
        >
            <Box sx={{ flex: 1 }}>
                <Instructions></Instructions>
                <Metadata task={task} taskData={taskData}></Metadata>
                <LocationDisplay capturePoint={capturePoint}></LocationDisplay>
                <SaveButton readyToSave={readyToSave} resultData={resultData}></SaveButton>
            </Box>
        </Flex>
    );
};

export default TaskSidebar;