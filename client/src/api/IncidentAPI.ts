import axios from "axios";

export const incidentAPI = {
    getAllIncidents,
    getAllUnsresolvedIncidents,
    getIncidentsPastDeadline,
    createIncident
}

let defaultConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
    },
    withCredentials: true
}

function getAllIncidents() {
    return axios.get("http://localhost:8080/api/incident/all", defaultConfig);
}

function getAllUnsresolvedIncidents() {
    const config = { ...defaultConfig, params: { isResolved: false}};
    return axios.get("http://localhost:8080/api/incident/all", config);
}

function getIncidentsPastDeadline() {
    const config = { ...defaultConfig, params: { beforeDate: new Date(), isResolved: false }}
    return axios.get("http://localhost:8080/api/incident/all", config);
}

//TODO: add type
function createIncident(body: any){
    return axios.post('http://localhost:8080/api/incident', body, defaultConfig)
}