import {useState} from "react";
import FullScreenModal from "../../../modals/FullScreenModal.tsx";
import Gallery from "./gallery/Gallery.tsx";
import PostCard from "./PostCard/PostCard.tsx";
import {postService} from "../../../../services/api/postService.ts";
import {AxiosError} from "axios";
import {errorService} from "../../../../services/util/errorService.ts";
import {useQuery} from "@tanstack/react-query";

function Feed() {

    const [selectedImages, setSelectedImages] = useState<File[]>();
    const [selectedImageIndex, setSelectedImageIndex] = useState<number>();


    const { data: postList, error, isLoading } = useQuery({
        queryKey: ["postList"],      // identifiant du cache
        queryFn: postService.getAll,
        select: (data) => {
            return [...data].sort((a, b) => {
                const dateA = a.creationTime ? new Date(a.creationTime).getTime() : 0;
                const dateB = b.creationTime ? new Date(b.creationTime).getTime() : 0;
                return dateB - dateA; // Tri décroissant
            });
        }
    })

    if(error){
        errorService.showErrorInAlert(error as AxiosError);
    }
    console.log(isLoading); //TODO GERER

    const openImagesModal = (files: File[], index: number) => {
        setSelectedImages(files);
        setSelectedImageIndex(index);
    }

    const hideImagesModal = () => {
        setSelectedImages([]);
    }

    if (!postList || postList.length === 0) {
        return <p>Aucun post disponible</p>;
    }

    const postEltList = postList?.map((post) => (
                <PostCard post={post} key={post.id} openImagesModal={openImagesModal} />
            )
        )
        ??(<div>Aucun post disponible</div>)
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