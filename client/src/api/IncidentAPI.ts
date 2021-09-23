import axios from "axios";

export function getAllIncidents() {
    return axios.get("http://localhost:8080/api/incident/all");
}

export function getAllUnsresolvedIncidents() {
    return axios.get("http://localhost:8080/api/incident/all", {
        params: { isResolved: false }
    });
}

export function getIncidentsPastDeadline() {
    return axios.get("http://localhost:8080/api/incident/all", {
        params: { beforeDate: new Date(), isResolved: false }
    });
}