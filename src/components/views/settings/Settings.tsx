import PrimaryBtn from "../../buttons/PrimaryBtn.tsx";
import {useAuth} from "../../contexts/useAuth.tsx";
import LoaderComponent from "../../util/LoaderComponent.tsx";
import {useMutation} from "@tanstack/react-query";
import {fileService} from "../../../services/api/fileService.ts";
import {errorService} from "../../../services/util/errorService.ts";
import {useState} from "react";
import type {AxiosError} from "axios";

function Settings() {

    const {logout, isAdmin} = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const handleLogout = () => {
        logout();
    };

    const checkPicturesStatusMutation = useMutation({
        mutationFn: async () => {
            setIsLoading(true);
            return await fileService.checkPicturesStatus();
        },
        onSuccess: () => {
            setIsLoading(false);
        },
        onError: (err: AxiosError | Error) => {
            setIsLoading(false);
            errorService.showErrorInAlert(err);
        },
    });

    const checkPicture = () => {
        checkPicturesStatusMutation.mutate();
    }

    return (
        <>
            { isLoading && <LoaderComponent />}
            <div className="flex justify-around p-4 max-w-xl mx-auto mb-2">
                <h1 className="text-2xl ">Paramètres</h1>
            </div>
            {isAdmin &&
                <div className="flex justify-center">
                    <PrimaryBtn label="Vérifier les photos" extraClass="m-2 " onClick={checkPicture} resize={false}/>
                </div>
            }
            <div className="flex justify-center">
                <PrimaryBtn label="Se déconnecter" extraClass="m-2 " onClick={handleLogout} resize={false}/>
            </div>
        </>
    )
}

export default Settings
