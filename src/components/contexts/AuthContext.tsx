import {createContext, type ReactNode, useState} from "react";
import type {User} from "../../models/User/user.ts";
import type {LoginUserResponse} from "../../models/Login/loginUserResponse.ts";

type AuthContextType = {
    connectedUser: User | null;
    login: (loginUserResponse: LoginUserResponse) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({children}: { children: ReactNode }) => {
    const [connectedUser, setConnectedUser] = useState<User | null>(() => {
        const savedUser = localStorage.getItem("connectedUser");
        return savedUser ? JSON.parse(savedUser) as User : null;
    });

    const login = (loginUserResponse: LoginUserResponse) => {
        localStorage.setItem('token', loginUserResponse.token);
        localStorage.setItem('connectedUser', JSON.stringify(loginUserResponse.user));
        setConnectedUser(loginUserResponse.user);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('connectedUser');
        setConnectedUser(null);
    };

    return (
        <AuthContext.Provider value={{connectedUser, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;

