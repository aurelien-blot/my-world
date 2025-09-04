import {useState} from "react";
import PrimaryBtn from "../../buttons/PrimaryBtn.tsx";
import {useMutation, useQuery} from "@tanstack/react-query";
import {loginService} from "../../../services/api/loginService.ts";
import type {LoginUserRequest} from "../../../models/Login/loginUserRequest.ts";
import {testService} from "../../../services/api/testService.ts";

function LoginView() {

    const { data: testResponse, error, isLoading } = useQuery({
        queryKey: ["test"],      // identifiant du cache
        queryFn: testService.test,
    });

    const loginMutation = useMutation({
        mutationFn: (loginRequest: LoginUserRequest) => loginService.login(loginRequest),
        onSuccess: (user) => {
            console.log("Utilisateur connecté :", user);
            // TODO : sauvegarder token / rediriger
        },
        onError: () => {
            setErrorMsg("Erreur de connexion");
        },
    });

    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const loginAttempt = () => {
        console.log(testResponse, error, isLoading);
        loginMutation.mutate({identifier, password});
        setErrorMsg('Erreur de connexion');
    }
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

