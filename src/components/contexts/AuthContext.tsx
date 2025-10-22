import {createContext, type ReactNode, useEffect, useState} from "react";
import type {User} from "../../models/User/user.ts";
import type {LoginUserResponse} from "../../models/Login/loginUserResponse.ts";
import {setupAxiosInterceptors} from "../../services/api/http.ts";

type AuthContextType = {
    connectedUser: User | null;
    isAdmin: boolean;
    login: (loginUserResponse: LoginUserResponse) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({children}: { children: ReactNode }) => {
    const [connectedUser, setConnectedUser] = useState<User | null>(() => {
        const savedUser = localStorage.getItem("connectedUser");
        return savedUser ? JSON.parse(savedUser) as User : null;
    });

    const[isAdmin, setIsAdmin] = useState<boolean>(connectedUser!=null && connectedUser.username === "admin");

    const login = (loginUserResponse: LoginUserResponse) => {
        localStorage.setItem('token', loginUserResponse.token);
        localStorage.setItem('connectedUser', JSON.stringify(loginUserResponse.user));
        setConnectedUser(loginUserResponse.user);
        setIsAdmin(loginUserResponse.user!=null && loginUserResponse.user.username === "admin");
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('connectedUser');
        setConnectedUser(null);
        setIsAdmin(false);
    };

    useEffect(() => {
        setupAxiosInterceptors(logout);
    }, []);

    return (
        <AuthContext.Provider value={{connectedUser, isAdmin,  login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;

