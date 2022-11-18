import "./Main.scss";
import {Outlet} from "react-router"
import { VehicleList } from "../vehicles/vehicle-list/VehicleList";
export function Main() {
    return(
    <div className="main-content">
        <><VehicleList/></>
    </div>
)
}