import { Routes, Route, Outlet } from "react-router-dom";
import Home from "../views/home/Home.tsx";
import Profile from "../views/profile/Profile.tsx";
import Settings from "../views/settings/Settings.tsx";
import NavigationBar from "../navigationBar/NavigationBar.tsx";
import {PrivateRoute} from "../routes/PrivateRoute.tsx";
import LoginView from "../views/login/LoginView.tsx";

function Layout() {
    return (
        <div className="flex flex-col h-screen">
            <NavigationBar />
            <div className="mt-0 md:mt-10 mb-10 md:mb-0 flex-1 overflow-auto">
                <Outlet />
            </div>
        </div>
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