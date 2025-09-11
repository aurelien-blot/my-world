import {useEffect, useRef, useState} from "react";
import NoPreview from "../../../../../assets/posts/no-preview.jpeg";
import {fileService} from "../../../../../services/api/fileService.ts";
import {useAuth} from "../../../../contexts/useAuth.tsx";
import {Trash} from "lucide-react";
import DangerBtn from "../../../../buttons/DangerBtn.tsx";
import {useLongPress} from "../../../../hooks/useLongPress.ts";

function PostCardPicture({
                             index,
                             filePath,                 // <- chemin vers ton endpoint (thumb)
                             alt,
                             className,
                             onClick,
                             onLoaded,
                             onDeletePostPictureFct// (optionnel) remonter le File/Blob au parent
                         }: {
    index: number;
    filePath: string;
    alt?: string;
    className?: string;
    onClick?: () => void;
    onLoaded?: (index: number, file: File) => void;
    onDeletePostPictureFct: (index: number) => void;
}) {
    const imgRef = useRef<HTMLImageElement | null>(null);
    const [src, setSrc] = useState<string>(NoPreview);
    const [showActions, setShowActions] = useState(false);
    const {isAdmin} = useAuth();
    const deletePostPictureFct = () => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cette image ?")) {
            onDeletePostPictureFct(index);
        }
    }

    const longPressHandlers = useLongPress(
        () => setShowActions(true),
        () => onClick?.(),
        { delay: 500 }
    );

    useEffect(() => {
        let started = false;
        let aborted = false;
        let objectUrl: string | undefined;
        const ac = new AbortController();
        const load = async () => {
            try {
                const blob = await fileService.getPicture(filePath, ac.signal);
                if (aborted) return;
                objectUrl = URL.createObjectURL(blob);
                setSrc(objectUrl);
                onLoaded?.(index, new File([blob], filePath.split("/").pop() ?? "image.jpg", {type: blob.type}));
            } catch {
                /* ignore (abort/404) */
            }
        };

        const el = imgRef.current;
        const io = new IntersectionObserver(([e]) => {
            if (e.isIntersecting && !started) {
                started = true;
                load();
                io.disconnect();
            }
        }, {rootMargin: "200px"});

        if (el) io.observe(el);

        return () => {
            aborted = true;
            ac.abort();
            if (objectUrl) URL.revokeObjectURL(objectUrl);
            io.disconnect();
        };
    }, [filePath, index]);

    return (
        <div className="relative inline-block group" onClick={() => setShowActions(prev => !prev)}>
            {isAdmin && (
                <div className={` absolute top-2 right-4 z-10
                ${showActions ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none md:group-hover:opacity-100 md:group-hover:pointer-events-auto"}
                          transition-opacity duration-150
                        `}>
                    <DangerBtn
                        onClick={deletePostPictureFct}
                        icon={<Trash className="h-3 w-3"/>}
                        tooltip="Supprimer l'image"
                        label=""
                        extraClass=""
                    />
                </div>
            )}

            <img
                ref={imgRef}
                src={src}
                alt={alt ?? ""}
                className={`block ${className ?? ""}`}
                loading="lazy"
                draggable={false}
                onClick={onClick}
                {...longPressHandlers}
            />
        </div>
    );
}

export default PostCardPicture;