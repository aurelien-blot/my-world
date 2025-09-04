import {useContext} from "react";
import AuthContext from "./AuthContext.tsx";

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth doit être utilisé dans un AuthProvider");
    return ctx;
}