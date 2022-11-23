import axios from 'axios';

const apiUrl = 'http://localhost:3005/rents';

export function getRents(){
    return axios.get(apiUrl);
}
export function getRentById(id){
    return axios.get(`${apiUrl}/${id}`);
}
export function saveRent(rentObj){
    if(rentObj.id)
    {
        return axios.put(`${apiUrl}/${rentObj.id}`,rentObj);
    }
    return axios.post(apiUrl,rentObj);

}

export function deleteRent(id)
{
    return axios.delete(`${apiUrl}/${id}`);
}