import { useEffect, useState } from "react";
import { deleteVehicle ,getVehicles } from "../../../utils/http-utils/vehicle-requests";
import { VehicleCard } from "../vehicle-card/VehicleCard";

import "./VehicleList.scss"

export function VehicleList(){
   
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        getVehicles().then(response => {
            setVehicles(response.data)
        });
    }, []);

    const onDelete = (id) =>{
        deleteVehicle(id).then(()=>{
            setVehicles((prevState) =>{
                return prevState.filter(vehicle => vehicle.id !==  id)
            });
        });
    }
   
    return(
        <div className="vehicle-list-wrapper">
            {vehicles.map(vehicle => <VehicleCard key = {vehicle.id} vehicle={vehicle} onDelete={onDelete}/>)}
        </div>
        )
}