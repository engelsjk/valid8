import axios from "axios";

import {
    TaskBuildingData,
    TaskID,
    ResultBuildingData,
} from "../shared/entities";

const apiAxios = axios.create();
const baseURL = "";

export async function fetchTaskBuilding(id: TaskID): Promise<TaskBuildingData> {
    return new Promise((resolve, reject) => {
        apiAxios
            .get(`${baseURL}/api/tasks/buildings/${id}`)
            .then(response => resolve(response.data))
            .catch(error =>
                reject({ errorMessage: error.response.data, statusCode: error.response.status })
            );
    });
}

export async function saveResultBuilding(resultBuildingData: ResultBuildingData | undefined): Promise<any> {
    if (!resultBuildingData) {
        console.log("no result building data");
        return;
    }
    return new Promise((resolve, reject) => {
        apiAxios
            .post(`${baseURL}/api/results/buildings/${resultBuildingData.taskID}`, resultBuildingData)
            .then(() => resolve(null))
            .catch(error =>
                reject({ errorMessage: error.response.data, statusCode: error.response.status })
            );
    });
}
