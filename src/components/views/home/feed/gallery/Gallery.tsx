import {ChevronLeft, ChevronRight} from "lucide-react";
import {useEffect, useRef, useState} from "react";
import type {PostPicture} from "../../../../../models/Post/postPicture.ts";
import NoPreview from "../../../../../assets/posts/no-preview.jpeg";
import {fileService} from "../../../../../services/api/fileService.ts";

function Gallery({goToPreviousPicture, goToNextPicture, selectedPictures, selectedPictureIndex}: {
    goToPreviousPicture: () => void,
    goToNextPicture: () => void,
    selectedPictures: PostPicture[],
    selectedPictureIndex: number
}) {

    const imgRef = useRef<HTMLImageElement | null>(null);
    const [src, setSrc] = useState<string>(NoPreview);
    const isMoreThanOnePicture = selectedPictures.length > 1;
    const currentPicture = selectedPictures[selectedPictureIndex];

    useEffect(() => {
        let started = false;
        let aborted = false;
        let objectUrl: string | undefined;
        const ac = new AbortController();
        const load = async () => {
            try {
                console.log(currentPicture.filePath)
                const blob = await fileService.getPicture(currentPicture.filePath, ac.signal);
                if (aborted) return;
                objectUrl = URL.createObjectURL(blob);
                setSrc(objectUrl);
                onLoaded?.(new File([blob], filePath.split("/").pop() ?? "image.jpg", {type: blob.type}));
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

        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedPictureIndex > 0 && e.key === "ArrowLeft") {
                goToPreviousPicture();
            }
            else if (selectedPictureIndex < (selectedPictures.length - 1) && e.key === "ArrowRight") {
                goToNextPicture();
            }
        }
        if(isMoreThanOnePicture){
            window.addEventListener("keydown", handleKeyDown)
        }

        return () => {
            if(isMoreThanOnePicture){
                window.removeEventListener("keydown", handleKeyDown);
            }

            aborted = true;
            ac.abort();
            if (objectUrl) URL.revokeObjectURL(objectUrl);
            io.disconnect();
        }
    }, [isMoreThanOnePicture, selectedPictureIndex, selectedPictures, goToPreviousPicture, goToNextPicture,currentPicture])

    return (
        <div className="relative h-screen w-screen flex items-center justify-center">
            {isMoreThanOnePicture && selectedPictureIndex > 0 &&
                <button
                    onClick={goToPreviousPicture} title="Précédent"
                    className=" text-white hover:cursor-pointer absolute left-0 md:left-5 top-1/2 -translate-y-1/2 z-100"
                >
                    <ChevronLeft className="h-12 w-12"/>
                </button>
            }
            <div className="flex items-center justify-center h-screen w-screen relative pb-10">
                <img
                    ref={imgRef}
                    src={src}
                    alt="full"
                    loading="lazy"
                    className="max-h-[80%] max-w-[80%] object-contain rounded"
                />
            </div>
            {isMoreThanOnePicture && selectedPictureIndex < (selectedPictures.length - 1) &&
                <button
                    onClick={goToNextPicture} title="Suivant"
                    className="text-white hover:cursor-pointer absolute right-0 md:right-5 top-1/2 -translate-y-1/2 z100"
                >
                    <ChevronRight className="h-12 w-12"/>
                </button>
            }
        </div>
    )
}

export default Gallery;