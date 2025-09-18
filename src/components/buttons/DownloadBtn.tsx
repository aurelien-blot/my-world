import {Download} from "lucide-react";

function DownloadBtn({onClick}:
                    {
                        onClick?: () => void,
                    }) {
    return (
        <button
            onClick={onClick}
            className="absolute top-5 right-20 text-white hover:cursor-pointer"
            aria-label="Télécharger l'image"
            title="Télécharger l'image"
        >
            <Download className="h-8 w-8" />
        </button>
    )
}

export default DownloadBtn;