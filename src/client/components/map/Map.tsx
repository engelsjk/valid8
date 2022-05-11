/** @jsxRuntime classic */
/** @jsx jsx */

import { useEffect, useRef, Dispatch, SetStateAction } from "react";
import { Box } from "theme-ui";
import { jsx } from "theme-ui";

import MapboxGL from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import {
    Point
} from "../../../shared/entities";

import Marker from "./Markers";
import { MAPBOX_STYLE, MAPBOX_TOKEN } from "../../constants/map";

interface MapProps {
    map?: MapboxGL.Map;
    // eslint-disable-next-line
    setMap: Dispatch<SetStateAction<MapboxGL.Map | undefined>>;
    setHavePoint: Dispatch<SetStateAction<boolean>>;
    taskPoint?: Point;
    iconName?: string;
    capturePoint?: Point;
    setCapturePoint: Dispatch<SetStateAction<Point | undefined>>;
}

const Map = ({
    map,
    setMap,
    setHavePoint,
    taskPoint,
    iconName,
    capturePoint,
    setCapturePoint
}: MapProps) => {
    const mapRef = useRef<HTMLDivElement>(null);

    const clickHandler = (e: MapboxGL.MapMouseEvent) => {
        setCapturePoint({
            lnglat: e.lngLat,
        });
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

        if (!taskPoint) {
            return;
        }

        // eslint-disable-next-line
        MapboxGL.accessToken = MAPBOX_TOKEN;

        const map = new MapboxGL.Map({
            container: mapRef.current,
            style: MAPBOX_STYLE,
            center: taskPoint.lnglat,
            zoom: 17
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
            {map && capturePoint && <Marker map={map} iconName={iconName} point={capturePoint} setPoint={setCapturePoint}></Marker>}
        </Box >
    )
}

export default Map;