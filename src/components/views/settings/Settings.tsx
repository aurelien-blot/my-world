import PrimaryBtn from "../../buttons/PrimaryBtn.tsx";
import {useAuth} from "../../contexts/useAuth.tsx";

function Settings() {

    const {logout} = useAuth();
    const handleLogout = () => {
        logout();
    };

    return (
        <>
            <h1 className="mb-10">Paramètres</h1>
            <div className="flex justify-center">
                <PrimaryBtn label="Se déconnecter" onClick={handleLogout} />
            </div>
        </>
    )
}

export default Settings
