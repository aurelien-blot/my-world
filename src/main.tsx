import { createRoot } from 'react-dom/client'
import {BrowserRouter} from "react-router";
import './index.css'
import App from "./components/App/App.tsx";

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
)
