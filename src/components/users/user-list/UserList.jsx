import { useEffect, useState } from "react";
import { deleteUser,getUsers } from "../../../utils/http-utils/user-requests";
import { UserCard } from "../user-card/UserCard";

import "./UserList.scss"

export function UserList(){
   
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers().then(response => {
            setUsers(response.data)
        });
    }, []);

    const onDelete = (id) => {
        deleteUser(id).then(() => {
            setUsers((prevState) => {
                return prevState.filter(user => user.id !== id);
            });
        });
    }
   
    return(
        <div className="vehicle-list-wrapper">
            {users.map(user => <UserCard key = {user.id} user={user} onDelete={onDelete}/>)}
        </div>
        );
}