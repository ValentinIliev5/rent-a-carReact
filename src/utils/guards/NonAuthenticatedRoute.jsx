import { getLoggedUser } from "../http-utils/auth-http-utils";
import { useNavigate, Navigate } from "react-router";

export function NonAuthenticatedRoute({ children }) {
    const user = getLoggedUser();

    if (user) {
        return <Navigate to="/users" />;
    }

    return children;
}