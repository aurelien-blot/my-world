import {ChevronLeft, ChevronRight} from "lucide-react";

function Gallery ({goToPreviousImage, goToNextImage, selectedImages, selectedImageIndex}: {
    goToPreviousImage: () => void,
    goToNextImage: () => void,
    selectedImages: File[],
    selectedImageIndex: number
}) {

    const isMoreThanOneImage = selectedImages.length > 1;
    const currentImage = selectedImages[selectedImageIndex];
    const selectedImage = URL.createObjectURL(currentImage);

  return (
      <div className="flex justify-center">
          {isMoreThanOneImage && selectedImageIndex > 0 &&
              <button
                  onClick={goToPreviousImage}
                  className=" text-white hover:cursor-pointer absolute left-5"
              >
                  <ChevronLeft className="h-8 w-8"/>
              </button>
          }
          <img
              src={selectedImage}
              alt="full"
              className="max-h-[90%] max-w-[90%] object-contain rounded"
          />
          {isMoreThanOneImage && selectedImageIndex < (selectedImages.length-1) &&
              <button
                  onClick={goToNextImage}
                  className="text-white hover:cursor-pointer absolute right-5"
              >
                  <ChevronRight className="h-8 w-8"/>
              </button>
          }
      </div>
  )
}

export default Gallery;