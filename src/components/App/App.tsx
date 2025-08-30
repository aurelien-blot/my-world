import './App.css'
import { Routes, Route, Outlet } from "react-router-dom";
import Home from "../views/home/Home.tsx";
import Profile from "../views/profile/Profile.tsx";
import Settings from "../views/settings/Settings.tsx";
import NavigationBar from "../navigationBar/NavigationBar.tsx";

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
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
            </Route>
        </Routes>
    );
}