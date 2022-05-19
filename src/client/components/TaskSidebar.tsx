/** @jsxRuntime classic */
/** @jsx jsx */
import { Box, Button, Flex, jsx, ThemeUIStyleObject } from "theme-ui";

import { saveResultBuilding } from "../api";
import { TaskBuildingData, ResultBuildingData } from "../../shared/entities";

import TaskName from "./TaskName";

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
        fontSize: "2em",
        color: 'white70',
        border: 'none',
        outline: 'none',
        cursor: 'pointer',
        borderRadius: 4,
        transition: 'all 200ms',
        ':focus': {
            outline: '1px solid',
        },
        ':hover': {
            color: 'white',
            backgroundColor: '#454545',
        },
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

const Instructions = ({
    taskData
}: {
    readonly taskData?: TaskBuildingData;
}) => {
    return (
        <div sx={{ height: "100%", display: "inline-block", overflow: "auto" }}>
            <h2 sx={{ margin: "0 0 5px 0" }}>Instructions</h2>
            {taskData && (
                <span>{taskData.task_instruction}</span>
            )}
        </div>
    );
};

const Metadata = ({
    taskData
}: {
    readonly taskData?: TaskBuildingData;
}) => {

    function taskDataList(taskData: TaskBuildingData) {
        return (
            <div >
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
        <Box sx={{ height: "100%", display: "inline-block", overflow: "auto" }}>
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
        <div sx={{ height: "100%", display: "inline-block", overflow: "auto" }}>
            <h2 sx={{ margin: "0 0 5px 0" }}>Location</h2>
            {capturePoint && capturePoint.lnglat ? (
                <span>Point: {capturePoint.lnglat.lat.toFixed(5)}, {capturePoint.lnglat.lng.toFixed(5)}</span>
            ) : <span>Click on the map and drag the marker around to set a location.</span>
            }
        </div>
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
        <Box>
            {readyToSave && (
                <Button sx={{
                    ...style.saveButton,
                }} onClick={() => saveResultBuilding(resultData)}>
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
            className="task-sidebar"
        >
            <Box sx={{ flex: 1 }}>
                <Flex sx={{ height: "10%", flexDirection: "column" }}>
                    {task ? <TaskName task={task} /> : "..."}
                </Flex>
                <Flex sx={{ height: "20%", flexDirection: "column" }}>
                    <Instructions taskData={taskData} />
                </Flex>
                <Flex sx={{ height: "45%", flexDirection: "column" }}>
                    <Metadata taskData={taskData}></Metadata>
                </Flex>
                <Flex sx={{ height: "10%", flexDirection: "column" }}>
                    <LocationDisplay capturePoint={capturePoint}></LocationDisplay>
                </Flex>
                <Flex sx={{ height: "10%", flexDirection: "column" }}>
                    <SaveButton readyToSave={readyToSave} resultData={resultData}></SaveButton>
                </Flex>
            </Box>
        </Flex>
    );
};

export default TaskSidebar;