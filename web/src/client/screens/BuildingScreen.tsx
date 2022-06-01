/** @jsxRuntime classic */
/** @jsx jsx */
import MapboxGL from "mapbox-gl";
import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import { Flex, jsx } from "theme-ui";

import { fetchTaskBuilding } from "../api";
import { ITask, TaskBuildingData, ResultBuildingData, Point } from "../../shared/entities";

import Map from "../components/map/Map";
import TaskHeader from "../components/TaskHeader";
import TaskSidebar from "../components/TaskSidebar";

import TaskNotFoundScreen from "./TaskNotFoundScreen";
import ErrorScreen from "./ErrorScreen";

const BuildingScreen = () => {

    const [map, setMap] = useState<MapboxGL.Map | undefined>(undefined);
    const [taskPoint, setTaskPoint] = useState<Point>();
    const [taskData, setTaskData] = useState<TaskBuildingData>();
    const [capturePoint, setCapturePoint] = useState<Point | undefined>(undefined);
    const [resultData, setResultData] = useState<ResultBuildingData>();

    const [isLoading, setIsLoading] = useState(true);
    const [taskNotFound, setTaskNotFound] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [havePoint, setHavePoint] = useState(false);

    const { taskID } = useParams();
    const task: ITask = {
        id: taskID
    }

    useEffect(() => {

        if (task.id === "demo") {
            setTaskPoint({
                lnglat: new MapboxGL.LngLat(0, 0)
            });
            setIsLoading(false);
            setTaskData({});
            return;
        }

        if (task.id) {
            fetchTaskBuilding(task.id)
                .then(bldg => {
                    setIsLoading(false);
                    setTaskData(bldg);
                    if (typeof (bldg.task_lon) != 'number' || typeof (bldg.task_lat) != 'number') {
                        setHasError(true);
                        return;
                    }
                    setTaskPoint({
                        lnglat: new MapboxGL.LngLat(bldg.task_lon, bldg.task_lat)
                    });
                })
                .catch(err => {
                    setIsLoading(false);
                    if (err.statusCode == 404) {
                        setTaskNotFound(true);
                    } else {
                        setHasError(true);
                    }
                })
        }
    }, [])

    useEffect(() => {
        if (task.id && capturePoint) {
            setResultData({
                taskID: task.id,
                logTs: Math.floor(new Date().getTime()),
                newLat: capturePoint.lnglat.lat,
                newLon: capturePoint.lnglat.lng
            })
        }
    }, [task.id, capturePoint])

    // TODO:
    // what if buildings[0] latlng is NA??
    // what if task/building/{taskid} JSON is not a []??
    // maybe feed map a zoom value?

    return isLoading ? (
        <div className="App">Loading...</div>
    ) : taskNotFound ? (
        <Flex sx={{ height: "100%", flexDirection: "column" }}>
            <TaskNotFoundScreen model={"task"} id={task.id} />
        </Flex>
    ) : hasError ? (
        <Flex sx={{ height: "100%", flexDirection: "column" }}>
            <ErrorScreen model={"task"} id={task.id} />
        </Flex>
    ) : (
        <Flex sx={{ height: "100%", flexDirection: "column" }}>
            <TaskHeader />
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

export default BuildingScreen;
