import {useEffect, useRef, useState} from "react";
import NoPreview from "../../../../../assets/posts/no-preview.jpeg";
import {fileService} from "../../../../../services/api/fileService.ts";

function PostCardPicture({
                             index,
                             filePath,                 // <- chemin vers ton endpoint (thumb)
                             alt,
                             className,
                             onClick,
                             onLoaded,                 // (optionnel) remonter le File/Blob au parent
                         }: {
    index: number;
    filePath: string;
    alt?: string;
    className?: string;
    onClick?: () => void;
    onLoaded?: (index : number, file: File) => void;
}) {
    const imgRef = useRef<HTMLImageElement | null>(null);
    const [src, setSrc] = useState<string>(NoPreview);

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
        }, { rootMargin: "200px" });

        if (el) io.observe(el);

        return () => {
            aborted = true;
            ac.abort();
            if (objectUrl) URL.revokeObjectURL(objectUrl);
            io.disconnect();
        };
    }, [filePath, index]);

    return (
        <img
            ref={imgRef}
            src={src}
            alt={alt ?? ""}
            className={className}
            loading="lazy"
            draggable={false}
            onClick={onClick}
        />
    );
}
export default PostCardPicture;