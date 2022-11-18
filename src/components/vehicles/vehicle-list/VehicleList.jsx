import { useEffect, useState } from "react";
import { getVehicles } from "../../../utils/http-utils/vehicle-requests";
import { VehicleCard } from "../vehicle-card/VehicleCard";

import "./VehicleList.scss"

export function VehicleList(){
   
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        getVehicles().then(response => {
            setVehicles(response.data)
        });
    }, []);
   
    return(
        <div className="vehicle-list-wrapper">
            {vehicles.map(vehicle => <VehicleCard key = {vehicle.id} vehicle={vehicle}/>)}
        </div>
        )
}