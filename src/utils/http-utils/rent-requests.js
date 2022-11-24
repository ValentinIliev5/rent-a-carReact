import axios from 'axios';
import { calculatePrice } from './rents-helper';
import { getUserById } from './user-requests';
import { getVehicleById } from './vehicle-requests';

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
        totalPrice:`${calculatePrice(rentObj.startDate,rentObj.endDate,price,isVip)}`,
        isActive:true

    }
    console.log(rentObjtoAdd);
    if(rentObjtoAdd.id)
    {
        return axios.put(`${apiUrl}/${rentObjtoAdd.id}`,rentObjtoAdd);
    }
    return axios.post(apiUrl,rentObjtoAdd);

}
export function saveFullRent(rentObj,isVip,vehPrice)
{
    console.log("veh price " + vehPrice);
    console.log("user isvip " + isVip);
    rentObj.totalPrice = calculatePrice(rentObj.startDate
        ,rentObj.endDate
        ,vehPrice
        ,isVip);
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