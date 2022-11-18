import { useEffect, useState } from "react";
import { getUsers } from "../../../utils/http-utils/user-requests";
import { UserCard } from "../user-card/UserCard";

import "./UserList.scss"

export function UserList(){
   
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers().then(response => {
            setUsers(response.data)
        });
    }, []);
   
    return(
        <div className="vehicle-list-wrapper">
            {users.map(user => <UserCard key = {users.id} user={user}/>)}
        </div>
        )
}