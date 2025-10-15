import {useEffect, useRef, useState} from "react";
import NoPreview from "../../../../../assets/posts/no-preview.jpeg";
import {fileService} from "../../../../../services/api/fileService.ts";
import {useAuth} from "../../../../contexts/useAuth.tsx";
import {Trash} from "lucide-react";
import DangerBtn from "../../../../buttons/DangerBtn.tsx";
import {useLongPress} from "../../../../hooks/useLongPress.ts";
import type {PostPicture} from "../../../../../models/Post/postPicture.ts";

function PostCardPicture({
                             index,
                             picture,                 // <- chemin vers ton endpoint (thumb)
                             alt,
                             className,
                             onClick,
                             onLoaded,
                             onDeletePostPictureFct// (optionnel) remonter le File/Blob au parent
                         }: {
    index: number;
    picture: PostPicture;
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

    // --- anti-faux-clic ---
    const startPos = useRef<{x:number; y:number} | null>(null);
    const moved = useRef(false);
    const MOVE_THRESHOLD = 8; // px

    const onPointerDown = (e: React.PointerEvent) => {
        startPos.current = { x: e.clientX, y: e.clientY };
        moved.current = false;
    };
    const onPointerMove = (e: React.PointerEvent) => {
        if (!startPos.current) return;
        const dx = Math.abs(e.clientX - startPos.current.x);
        const dy = Math.abs(e.clientY - startPos.current.y);
        if (dx > MOVE_THRESHOLD || dy > MOVE_THRESHOLD) moved.current = true;
    };
    const onPointerUp = () => {
        startPos.current = null;
    };

    const safeClick = (cb?: () => void) => () => {
        if (moved.current) {
            // on a scrollé -> annuler le clic
            moved.current = false;
            return;
        }
        cb?.();
    };

    const deletePostPictureFct = (e?: React.MouseEvent) => {
        e?.stopPropagation();
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
                const blob = await fileService.downloadMiniPicture(picture.id!, ac.signal);
                if (aborted) return;
                objectUrl = URL.createObjectURL(blob);
                setSrc(objectUrl);
                onLoaded?.(index, new File([blob], picture.filename ?? "image.jpg", {type: blob.type}));
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
    }, [picture.id, index]);

    return (
        <div className="relative group flex items-center justify-center"
             onPointerDown={onPointerDown}
             onPointerMove={onPointerMove}
             onPointerUp={onPointerUp}
             onClick={safeClick(() => setShowActions(prev => !prev))}
        >
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
                // mêmes gardes anti-faux-clic pour l'image
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onClick={safeClick(onClick)}
                {...longPressHandlers}
            />
        </div>
    );
}

export default PostCardPicture;