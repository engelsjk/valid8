import { Feature, FeatureCollection, MultiPolygon } from "geojson";

export type TaskID = string;

export interface TaskBuildingData {
    'PM&T.Region': string;
    Country: string;
    State: string;
    City: string;
    'Street.Address': string;
    'Metro.Area': string;
    Zip: string;
    GeoCode: string;
    CLLI: string;
    'RE.Object': string;
    AOID: string;
    County: string;
    'Company.Code': string;
    'Legal.Entity.Name': string;
    lat: number;
    lon: number;
    'Owned/Leased.Ind': string;
    'Primary.Asset.Class': string;
    'Secondary.Asset.Class': string;
    'Property.Manager': string;
}

export interface ResultBuildingData {
    'Street.Address': string;
    State: string;
    City: string;
    Zip: string;
    CLLI: string;
    lat: number;
    lon: number;
}