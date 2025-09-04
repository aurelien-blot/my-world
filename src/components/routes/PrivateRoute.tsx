import {useAuth} from "../contexts/useAuth.tsx";
import {Navigate} from "react-router-dom";
import type {JSX} from "react";

export function PrivateRoute({children}: {children: JSX.Element}) {

    const {user}  = useAuth();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
}