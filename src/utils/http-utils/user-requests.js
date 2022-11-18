import axios from "axios";

const apiUrl = "http://localhost:3005/users";

export function getUsers()
{
    return axios.get(apiUrl);
}

export function getUserById(id){
    return axios.get(`${apiUrl}/${id}`);
}

export async function saveUser(userObj) {
    //TODO
}

export function deleteUser(id) {
    return axios.delete(`${apiUrl}/${id}`);
}