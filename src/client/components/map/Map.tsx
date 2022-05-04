/** @jsxRuntime classic */
/** @jsx jsx */

import { useEffect, useRef, Dispatch, SetStateAction } from "react";
import { Box } from "theme-ui";
import { jsx } from "theme-ui";

import MapboxGL from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import {
    Point
} from "../../types";

import Markers from "./Markers";
import { MAPBOX_STYLE, MAPBOX_TOKEN } from "../../constants/map";

interface TaskMapProps {
    map?: MapboxGL.Map;
    // eslint-disable-next-line
    setMap: Dispatch<SetStateAction<MapboxGL.Map | undefined>>;
    setHavePoint: Dispatch<SetStateAction<boolean>>;
    center: Point;
    buildingPoints?: Point[];
    taskPoints?: Point[];
    setTaskPoints: Dispatch<SetStateAction<Point[]>>;
}

const TaskMap = ({
    map,
    setMap,
    setHavePoint,
    center,
    buildingPoints,
    taskPoints,
    setTaskPoints
}: TaskMapProps) => {
    const mapRef = useRef<HTMLDivElement>(null);

    const clickHandler = (e: MapboxGL.MapMouseEvent) => {
        setTaskPoints([{
            name: "entrance",
            lnglat: e.lngLat,
        }]);
        setHavePoint(true);
        // setPoints(points => [...points, {
        //     name: "task_point",
        //     lnglat: e.lngLat,
        // }]);
    };

    useEffect(() => {

        // eslint-disable-next-line
        if (mapRef.current === null) {
            return;
        }

        // eslint-disable-next-line
        MapboxGL.accessToken = MAPBOX_TOKEN;

        const map = new MapboxGL.Map({
            container: mapRef.current,
            style: MAPBOX_STYLE,
            center: center.lnglat,
            zoom: 15
            // hash: true
        });

        const onMapLoad = () => {
            setMap(map);
            map.resize();
            map.on("click", clickHandler);
        };

        map.on("load", onMapLoad);

        // eslint-disable-next-line
    }, [mapRef]);

    return (
        <Box ref={mapRef} sx={{ width: "100%", height: "100%", position: "relative" }}>
            {map && taskPoints && <Markers map={map} points={taskPoints}></Markers>}
        </Box >
    )
}

export default TaskMap;