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
            .get(`${baseURL}/api/task/building/${id}`)
            .then(response => resolve(response.data))
            .catch(error =>
                reject({ errorMessage: error.response.data, statusCode: error.response.status })
            );
    });
}

export async function saveResultBuilding(resultBuildingData: ResultBuildingData | undefined) {
    if (!resultBuildingData) {
        console.log("no result building data");
        return;
    }
    return new Promise((reject) => {
        apiAxios
            .post(`${baseURL}/api/result/building/${resultBuildingData.taskID}`, resultBuildingData)
            .catch(error => reject(error.message));
    });
}
