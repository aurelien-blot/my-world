import type {ReactNode} from "react";
import CloseModalBtn from "../buttons/CloseModalBtn.tsx";

function FullScreenModal({close, content} : {close: () => void, content: ReactNode}) {

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50">
            <div className="flex">
                <CloseModalBtn onClose={close}/>
            </div>

            <div className="flex mt-12 max-h-full max-w-full p-4  ">
                {content}
            </div>

        </div>
    )

}

export default FullScreenModal;