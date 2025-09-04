import {createRoot} from 'react-dom/client'
import {BrowserRouter} from "react-router-dom";
import './index.css'
import App from "./components/App/App.tsx";
import {AuthProvider} from "./components/contexts/AuthContext.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <AuthProvider>
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <App/>
                <ReactQueryDevtools initialIsOpen={false}/>
            </QueryClientProvider>
        </BrowserRouter>
    </AuthProvider>
)
