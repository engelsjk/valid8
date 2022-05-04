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
import { TaskID, TaskBuildingData, ResultBuildingData } from "../../shared/entities";

import TaskMap from "../components/map/Map";
import TaskHeader from "../components/TaskHeader";

const TaskBuildingScreen = () => {

    const [map, setMap] = useState<MapboxGL.Map | undefined>(undefined);
    const [buildingPoints, setBuildingPoints] = useState<Point[]>([]);
    const [buildingData, setBuildingData] = useState<TaskBuildingData[]>([]);
    const [taskPoints, setTaskPoints] = useState<Point[]>([]);
    const [resultBuildingData, setResultBuildingData] = useState<ResultBuildingData>();

    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(true);
    const [havePoint, setHavePoint] = useState(false);

    const { taskID } = useParams();

    useEffect(() => {
        if (taskID) {
            fetchTaskBuilding(taskID)
                .then(response => {
                    response.forEach(bldg => {
                        if (typeof (bldg.lat) != 'number' || typeof (bldg.lon) != 'number') {
                            return;
                        }
                        setBuildingPoints(buildingPoints => [...buildingPoints, {
                            name: "task-building",
                            lnglat: new MapboxGL.LngLat(bldg.lon, bldg.lat)
                        }]);
                        setBuildingData(buildingData => [...buildingData, bldg]);
                    });
                    setIsLoading(false);
                });
        }
    }, [taskID])

    useEffect(() => {
        if (buildingData.length) {
            if (typeof (buildingData[0].lat) != 'number' || typeof (buildingData[0].lon) != 'number') {
                setHasError(true);
            } else {
                setHasError(false);
            }
        } else {
            setHasError(true);
        }
    }, [buildingData])

    useEffect(() => {
        if (taskID && taskPoints.length) {
            setResultBuildingData({
                taskID: taskID,
                logTs: Math.floor(new Date().getTime() / 1000),
                newLat: taskPoints[0].lnglat.lat,
                newLon: taskPoints[0].lnglat.lng
            })
        }
    }, [taskID, taskPoints])

    // TODO:
    // what if buildings[0] latlng is NA??
    // what if task/building/{taskid} JSON is not a []??
    // maybe feed map a zoom value?

    let hasInstructions = true;
    let instructionsLabel = "INSTRUCTIONS: Unknown";
    if (buildingData.length) {
        const bldg = buildingData[0];
        instructionsLabel = `Locate the building entrance for ${bldg['Street.Address']}.`;
    }

    if (isLoading) {
        return <div className="App">Loading...</div>;
    }

    if (hasError) {
        return <div className="App">Error!</div>;
    }

    return (
        <Flex sx={{ height: "100%", flexDirection: "column" }}>
            {/* Header */}
            <Flex sx={{ flex: 1, overflowY: "auto" }}>
                {
                    <Flex
                        sx={{
                            flexDirection: "column",
                            flex: 1,
                            background: "#fff",
                        }}
                    >
                        {hasInstructions ? (
                            <TaskHeader
                                label={instructionsLabel}
                                readyToSubmit={havePoint}
                                resultBuildingData={resultBuildingData}
                            />
                        ) : (
                            <Flex></Flex>
                        )}
                        <TaskMap
                            map={map}
                            setMap={setMap}
                            setHavePoint={setHavePoint}
                            center={buildingPoints[0]}
                            buildingPoints={buildingPoints}
                            taskPoints={taskPoints}
                            setTaskPoints={setTaskPoints}
                        />
                    </Flex>
                }
            </Flex>
        </Flex>
    )
}

export default TaskBuildingScreen;