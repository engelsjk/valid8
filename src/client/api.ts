import axios from "axios";

import {
    TaskBuildingData,
    TaskID,
} from "../shared/entities";

const apiAxios = axios.create();
const baseURL = "http://0.0.0.0:8080";

export async function fetchTaskBuilding(id: TaskID): Promise<TaskBuildingData[]> {
    return new Promise((resolve, reject) => {
        apiAxios
            .get(`${baseURL}/api/task/building/${id}`)
            .then(response => resolve(response.data))
            .catch(error => reject(error.message));
    });
}
