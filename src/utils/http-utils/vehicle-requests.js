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
    if(!vehicleObj.photo)
    {
        vehicleObj.photo="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png";
    }
    if(vehicleObj.id)
    {
        return axios.put(`${apiUrl}/${vehicleObj.id}`,vehicleObj);
    }

    return axios.post(`${apiUrl}`,vehicleObj)
}

export function deleteVehicle(id) {
    return axios.delete(`${apiUrl}/${id}`);
}