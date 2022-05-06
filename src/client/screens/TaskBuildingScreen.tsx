/** @jsxRuntime classic */
/** @jsx jsx */
import MapboxGL from "mapbox-gl";
import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import { Flex, jsx } from "theme-ui";

import {
    Point
} from "../types";

import { fetchTaskBuilding } from "../api";
import { ITask, TaskBuildingData, ResultBuildingData } from "../../shared/entities";

import Map from "../components/map/Map";
import TaskHeader from "../components/TaskHeader";
import TaskSidebar from "../components/TaskSidebar";

const TaskBuildingScreen = () => {

    const [map, setMap] = useState<MapboxGL.Map | undefined>(undefined);
    const [taskPoint, setTaskPoint] = useState<Point>();
    const [taskData, setTaskData] = useState<TaskBuildingData>();
    const [capturePoint, setCapturePoint] = useState<Point | undefined>(undefined);
    const [resultData, setResultData] = useState<ResultBuildingData>();

    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(true);
    const [havePoint, setHavePoint] = useState(false);

    const { taskID } = useParams();
    const task: ITask = {
        id: taskID
    }

    useEffect(() => {
        if (task.id) {
            fetchTaskBuilding(taskID)
                .then(bldg => {
                    if (typeof (bldg.lat) != 'number' || typeof (bldg.lon) != 'number') {
                        return;
                    }
                    setTaskPoint({
                        lnglat: new MapboxGL.LngLat(bldg.lon, bldg.lat)
                    });
                    setTaskData(bldg);
                    setIsLoading(false);
                });
        }
    }, [task])

    useEffect(() => {
        if (taskData) {
            if (typeof (taskData.lat) != 'number' || typeof (taskData.lon) != 'number') {
                setHasError(true);
            } else {
                setHasError(false);
            }
        } else {
            setHasError(true);
        }
    }, [taskData])

    useEffect(() => {
        if (task.id && capturePoint) {
            setResultData({
                taskID: task.id,
                logTs: Math.floor(new Date().getTime() / 1000),
                newLat: capturePoint.lnglat.lat,
                newLon: capturePoint.lnglat.lng
            })
        }
    }, [task.id, capturePoint])

    // TODO:
    // what if buildings[0] latlng is NA??
    // what if task/building/{taskid} JSON is not a []??
    // maybe feed map a zoom value?

    if (isLoading) {
        return <div className="App">Loading...</div>;
    }

    if (hasError) {
        return <div className="App">Error!</div>;
    }

    return (
        <Flex sx={{ height: "100%", flexDirection: "column" }}>
            <TaskHeader task={task} />
            <Flex sx={{ flex: 1, overflowY: "hidden" }}>
                {
                    <Flex
                        sx={{
                            flexDirection: "column",
                            flex: 3,
                            background: "#fff",
                        }}
                    >
                        <React.Fragment>
                            <Map
                                map={map}
                                setMap={setMap}
                                setHavePoint={setHavePoint}
                                taskPoint={taskPoint}
                                iconName={"entrance"}
                                capturePoint={capturePoint}
                                setCapturePoint={setCapturePoint}
                            />
                        </React.Fragment>
                    </Flex>
                }
                {<TaskSidebar
                    task={task}
                    taskData={taskData}
                    resultData={resultData}
                    capturePoint={capturePoint}
                    readyToSave={havePoint}
                />
                }
            </Flex>
        </Flex>
    )
}

export default TaskBuildingScreen;

// setTaskPoints(taskPoints => [...taskPoints, {
//     name: "task-building",
//     lnglat: new MapboxGL.LngLat(bldg.lon, bldg.lat)
// }]);