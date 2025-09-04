import './App.css'
import { Routes, Route, Outlet } from "react-router-dom";
import Home from "../views/home/Home.tsx";
import Profile from "../views/profile/Profile.tsx";
import Settings from "../views/settings/Settings.tsx";
import NavigationBar from "../navigationBar/NavigationBar.tsx";
import {PrivateRoute} from "../routes/PrivateRoute.tsx";
import LoginView from "../views/login/LoginView.tsx";

function Layout() {
    return (
        <>
            <NavigationBar /> {/* affiché une seule fois */}
            <div className="md:mt-10 mainContent">
                <Outlet /> {/* ici s’affichent les pages */}
            </div>
        </>
    );
}

export default function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/login" element={<LoginView />} />
                <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
                <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
            </Route>
        </Routes>
    );
}