import axios from "axios";

const apiUrl = "http://localhost:3005/vehicles";

export function getVehicles()
{
    return axios.get(apiUrl);
}

export function getVehicleById(id){
    return axios.get(`${apiUrl}/${id}`);
}

export async function saveVehicle(vehicleObj) {
    //TODO
}

export function deleteVehicle(id) {
    return axios.delete(`${apiUrl}/${id}`);
}