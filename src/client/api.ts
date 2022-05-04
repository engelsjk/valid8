import axios from "axios";

import {
    TaskBuildingData,
    TaskID,
    ResultBuildingData,
} from "../shared/entities";

const apiAxios = axios.create();
const baseURL = "http://0.0.0.0:3001";

export async function fetchTaskBuilding(id: TaskID): Promise<TaskBuildingData[]> {
    return new Promise((resolve, reject) => {
        apiAxios
            .get(`${baseURL}/api/task/building/${id}`)
            .then(response => resolve(response.data))
            .catch(error => reject(error.message));
    });
}

export async function submitResultBuilding(resultBuildingData: ResultBuildingData | undefined) {
    if (!resultBuildingData) {
        return;
    }
    return new Promise((reject) => {
        apiAxios
            .post(`${baseURL}/api/result/building/${resultBuildingData.taskID}`, resultBuildingData)
            .catch(error => reject(error.message));
    });
}
