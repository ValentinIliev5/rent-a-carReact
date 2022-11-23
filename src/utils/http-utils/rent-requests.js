import axios from 'axios';
import { calculatePrice } from './rents-helper';

const apiUrl = 'http://localhost:3005/rents';

export function getRents(){
    return axios.get(apiUrl);
}
export function getRentById(id){
    return axios.get(`${apiUrl}/${id}`);
}
export function saveRent(rentObj,price,isVip){

    const rentObjtoAdd ={
        id:`${rentObj.id}`,
        userId:`${rentObj.userId}`,
        vehicleId:`${rentObj.vehicleId}`,
        startDate:`${rentObj.startDate}`,
        endDate:`${rentObj.endDate}`,
        totalPrice:`${calculatePrice(rentObj.startDate,rentObj.endDate,price,isVip)}`

    }
    console.log(rentObjtoAdd);
    if(rentObjtoAdd.id)
    {
        return axios.put(`${apiUrl}/${rentObjtoAdd.id}`,rentObjtoAdd);
    }
    return axios.post(apiUrl,rentObjtoAdd);

}
export function saveFullRent(rentObj)
{
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