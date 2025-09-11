import PrimaryBtn from "../../buttons/PrimaryBtn.tsx";
import {useAuth} from "../../contexts/useAuth.tsx";

function Settings() {

    const {logout} = useAuth();
    const handleLogout = () => {
        logout();
    };

    return (
        <>
            <div className="flex justify-around p-4 max-w-xl mx-auto mb-2">
                <h1 className="text-2xl ">Paramètres</h1>
            </div>
            <div className="flex justify-center">
                <PrimaryBtn label="Se déconnecter" extraClass="m-2 " onClick={handleLogout} resize={false}/>
            </div>
        </>
    )
}

export default Settings
