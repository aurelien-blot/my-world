import {useState} from "react";
import PrimaryBtn from "../../buttons/PrimaryBtn.tsx";
import {useQuery} from "@tanstack/react-query";
import {testService} from "../../../services/api/testService.ts";

function LoginView() {

    const { data: testResponse, error, isLoading } = useQuery({
        queryKey: ["test"],      // identifiant du cache
        queryFn: testService.test,
    });

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const loginAttempt = () => {
        console.log(email, password);
        console.log(testResponse);
        console.log(error);
        console.log(isLoading);
        setErrorMsg('Erreur de connexion');
    }
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md bg-gray-600 shadow-lg rounded-xl p-8">
                <h1 className="text-2xl font-bold text-center text-gray-200 mb-6">Connexion</h1>
                {error && <p className="text-sm text-red-500 mb-4">{errorMsg}</p>}
                <form className="space-y-5"
                      onSubmit={(e) => e.preventDefault()}>
                    <div className="flex flex-col items-start">
                        <label htmlFor="username" className="font-medium text-gray-300 mb-1">Nom d'utilisateur</label>
                        <input onChange={(e) => setEmail(e.target.value)}
                               type="text" name="username" id="username" placeholder="Nom d'utilisateur"
                               autoComplete="username"
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

