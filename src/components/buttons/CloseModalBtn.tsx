import {X} from "lucide-react";

function CloseModalBtn({onClose}:
                    {
                        onClose?: () => void,
                    }) {
    return (
        <button
            onClick={onClose}
            className="absolute top-5 right-5 text-white hover:cursor-pointer"
        >
            <X className="h-8 w-8" />
        </button>
    )
}

export default CloseModalBtn;