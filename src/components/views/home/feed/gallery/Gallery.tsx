import {ChevronLeft, ChevronRight} from "lucide-react";
import {useEffect} from "react";

function Gallery({goToPreviousImage, goToNextImage, selectedImages, selectedImageIndex}: {
    goToPreviousImage: () => void,
    goToNextImage: () => void,
    selectedImages: File[],
    selectedImageIndex: number
}) {

    const isMoreThanOneImage = selectedImages.length > 1;
    const currentImage = selectedImages[selectedImageIndex];
    const selectedImage = URL.createObjectURL(currentImage);

    useEffect(() => {
        if(!isMoreThanOneImage){
            return;
        }
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedImageIndex > 0 && e.key === "ArrowLeft") {
                goToPreviousImage();
            }
            else if (selectedImageIndex < (selectedImages.length - 1) && e.key === "ArrowRight") {
                goToNextImage();
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [isMoreThanOneImage, selectedImageIndex, selectedImages.length, goToPreviousImage, goToNextImage])

    return (
        <div className="relative h-screen w-screen flex items-center justify-center">
            {isMoreThanOneImage && selectedImageIndex > 0 &&
                <button
                    onClick={goToPreviousImage} title="Précédent"
                    className=" text-white hover:cursor-pointer absolute left-0 md:left-5 top-1/2 -translate-y-1/2 z-100"
                >
                    <ChevronLeft className="h-12 w-12"/>
                </button>
            }
            <div className="flex items-center justify-center h-screen w-screen relative pb-10">
                <img
                    src={selectedImage}
                    alt="full"
                    className="max-h-[80%] max-w-[80%] object-contain rounded"
                />
            </div>
            {isMoreThanOneImage && selectedImageIndex < (selectedImages.length - 1) &&
                <button
                    onClick={goToNextImage} title="Suivant"
                    className="text-white hover:cursor-pointer absolute right-0 md:right-5 top-1/2 -translate-y-1/2 z100"
                >
                    <ChevronRight className="h-12 w-12"/>
                </button>
            }
        </div>
    )
}

export default Gallery;