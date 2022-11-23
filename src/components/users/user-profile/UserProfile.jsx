import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getUserById } from "../../../utils/http-utils/user-requests";
import { UserCard } from "../user-card/UserCard";

import './UserProfile.scss';

export function UserProfile() {
    const params = useParams();
    const [user, setUser] = useState({});

    useEffect(() => {
        if (params.id) {
            const promises = [getUserById(params.id)];
            Promise.all(promises)
                .then(result => {
                    setUser(result[0].data);
                });
        }
    }, [params.id])

    return (
        <div className="user-profile">
            <div className="user-info">
                <UserCard user={user} />
            </div>
        </div>
    );
}