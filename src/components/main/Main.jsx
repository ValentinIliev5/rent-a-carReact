import "./Main.scss";
import {Outlet} from "react-router"
import { UserList } from "../users/user-list/UserList";
export function Main() {
    return(
    <div className="main-content">
        <><UserList/></>
    </div>
)
}