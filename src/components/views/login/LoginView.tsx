import {useEffect, useState} from "react";
import PrimaryBtn from "../../buttons/PrimaryBtn.tsx";
import {useMutation} from "@tanstack/react-query";
import {loginService} from "../../../services/api/loginService.ts";
import type {LoginUserRequest} from "../../../models/Login/loginUserRequest.ts";
import {errorService} from "../../../services/util/errorService.ts";
import type {LoginUserResponse} from "../../../models/Login/loginUserResponse.ts";
import {useAuth} from "../../contexts/useAuth.tsx";
import type {AxiosError} from "axios";
import {useNavigate} from "react-router-dom";

function LoginView() {

   /* const { data: testResponse, error, isLoading } = useQuery({
        queryKey: ["test"],      // identifiant du cache
        queryFn: testService.test,
    });*/
    const { login } = useAuth();
    const navigate = useNavigate();

    const loginMutation = useMutation({
        mutationFn: (loginRequest: LoginUserRequest) => loginService.login(loginRequest),
        onSuccess: (loginResponse  : LoginUserResponse) => {
            console.log("Utilisateur connecté :", loginResponse.user.username);
            if(loginResponse.success){
                login(loginResponse);
                navigate("/");
            }
            else{
                setErrorMsg(loginResponse.message);
            }
        },
        onError: (error: AxiosError ) => {
            //Si erreur 403 on gère manuellement
            if(error.response && error.response.status === 403){
                setErrorMsg("Identifiant ou mot de passe incorrect");
            }
            else{
                errorService.showErrorInAlert(error);
            }
        },
    });

    const [identifier, setIdentifier] = useState('guest');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const loginAttempt = () => {
        setErrorMsg('');
        loginMutation.mutate({ identifier, password });
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Enter") {
                loginAttempt();
            }
        }

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [loginAttempt]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md bg-gray-600 shadow-lg rounded-xl p-8">
                <h1 className="text-2xl font-bold text-center text-gray-200 mb-6">Connexion</h1>
                {errorMsg && <p className="text-sm text-red-500 mb-4">{errorMsg}</p>}
                <form className="space-y-5"
                      onSubmit={(e) => e.preventDefault()}>
                    <div className="flex flex-col items-start">
                        <label htmlFor="identifier" className="font-medium text-gray-300 mb-1">Nom d'utilisateur</label>
                        <input onChange={(e) => setIdentifier(e.target.value)}
                               value={identifier}
                               type="text" name="identifier" id="identifier" placeholder="Nom d'utilisateur"
                               autoComplete="identifier"
                               className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        ></input>
                    </div>

                    <div className="flex flex-col items-start">
                        <label htmlFor="password" className="font-medium text-gray-300 mb-1">
                            Mot de passe
                        </label>
                        <input type="password"
                               name="password" id="password" placeholder="Mot de passe" autoComplete="new-password"
                               onChange={(e) => setPassword(e.target.value)}
                               className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"

                        ></input>
                    </div>

                    <div className="flex justify-center">
                        <PrimaryBtn onClick={loginAttempt} label="Se connecter"
                                    extraClass=""
                                    tooltip="Se connecter" resize={false}/>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginView;

