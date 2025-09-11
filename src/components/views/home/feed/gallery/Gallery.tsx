import {ChevronLeft, ChevronRight} from "lucide-react";
import {useEffect, useRef, useState} from "react";
import type {PostPicture} from "../../../../../models/Post/postPicture.ts";
import NoPreview from "../../../../../assets/posts/no-preview.jpeg";
import {fileService} from "../../../../../services/api/fileService.ts";
import LoaderComponent from "../../../../util/LoaderComponent.tsx";
import {useSwipeable} from "react-swipeable";

function Gallery({goToPreviousPicture, goToNextPicture, selectedPictures, selectedPictureIndex}: {
    goToPreviousPicture: () => void,
    goToNextPicture: () => void,
    selectedPictures: PostPicture[],
    selectedPictureIndex: number
}) {

    const imgRef = useRef<HTMLImageElement | null>(null);
    const [src, setSrc] = useState<string | null>(null);
    const isMoreThanOnePicture = selectedPictures.length > 1;
    const currentPicture = selectedPictures[selectedPictureIndex];
    const [isLoading, setIsLoading] = useState(true);

    const handlers = useSwipeable({
        onSwipedLeft: () => {
            if (selectedPictureIndex < (selectedPictures.length - 1)) {
                goToNextPicture();
            }
        },
        onSwipedRight: () => {
            if (selectedPictureIndex > 0 ){
                goToPreviousPicture();
            }
        }
    });

    useEffect(() => {
        let objectUrl: string | undefined;
        const ac = new AbortController();
        setIsLoading(true);

        const load = async () => {
            try {
                const blob = await fileService.getPicture(currentPicture.filePath, ac.signal);
                objectUrl = URL.createObjectURL(blob);
                setSrc(objectUrl);
            } catch {
                setSrc(NoPreview);
            } finally {
                setIsLoading(false);
            }
        };
        load();
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedPictureIndex > 0 && e.key === "ArrowLeft") {
                goToPreviousPicture();
            } else if (selectedPictureIndex < (selectedPictures.length - 1) && e.key === "ArrowRight") {
                goToNextPicture();
            }
        }
        if (isMoreThanOnePicture) {
            window.addEventListener("keydown", handleKeyDown)
        }

        return () => {
            if (isMoreThanOnePicture) {
                window.removeEventListener("keydown", handleKeyDown);
            }
            ac.abort();
            if (objectUrl) URL.revokeObjectURL(objectUrl);
        }
    }, [selectedPictureIndex, selectedPictures, goToPreviousPicture, goToNextPicture, currentPicture, isMoreThanOnePicture])

    return (
        <div className="h-full w-full">
            {isLoading &&
                <LoaderComponent/>
            }
            {!isLoading &&
                <div className="relative h-screen w-screen flex items-center justify-center" {...handlers}>
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
                            src={src!}
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
            }
        </div>

    )
}

export default Gallery;