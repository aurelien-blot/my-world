import type {Post} from "../../../../models/Post/model.ts";
import {useState} from "react";
import FullScreenModal from "../../../modals/FullScreenModal.tsx";
import Gallery from "./gallery/Gallery.tsx";
import PostCard from "./PostCard/PostCard.tsx";

function Feed({postList}: { postList: Post[] }) {

    const [selectedImages, setSelectedImages] = useState<File[]>();
    const [selectedImageIndex, setSelectedImageIndex] = useState<number>();

    const openImagesModal = (files: File[], index: number) => {
        setSelectedImages(files);
        setSelectedImageIndex(index);
    }

    const hideImagesModal = () => {
        setSelectedImages([]);
    }

    const postEltList = postList.map((post) => (
                <PostCard post={post} openImagesModal={openImagesModal} />
            )
        )
    ;

    const modalContent = () => {

        if (selectedImages == null || selectedImages.length == 0 || selectedImageIndex == null) {
            return (<div>Aucune photo disponible</div>);
        } else {

            const goToPreviousImage = () => {
                if (selectedImageIndex > 0) {
                    setSelectedImageIndex(selectedImageIndex - 1);
                }
            }

            const goToNextImage = () => {
                if (selectedImageIndex < (selectedImages.length - 1)) {
                    setSelectedImageIndex(selectedImageIndex + 1);
                }
            }
            return (
                <Gallery goToPreviousImage={goToPreviousImage}
                         goToNextImage={goToNextImage}
                         selectedImages={selectedImages} selectedImageIndex={selectedImageIndex}/>
            );
        }
    }

    return (
        <>
            <div className="block p-4">
                <div>{postEltList}</div>
            </div>
            {selectedImages != null && selectedImages.length > 0 &&
                <FullScreenModal close={hideImagesModal} content={modalContent()}/>
            }
        </>

    );
}

export default Feed;