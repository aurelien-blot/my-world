import {type ReactNode, useEffect} from "react";
import CloseModalBtn from "../buttons/CloseModalBtn.tsx";

function FullScreenModal({close, content, canClose = true}: {
    close: () => void,
    content: ReactNode,
    canClose?: boolean
}) {

    useEffect(() => {
        if (!canClose) return

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                close()
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [canClose, close])

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-[500]">
            {canClose &&
                <div className="flex">
                    <CloseModalBtn onClose={close}/>
                </div>
            }

            <div className="flex h-full w-full pt-12 pb-12 ">
                {content}
            </div>

        </div>
    )

}

export default FullScreenModal;