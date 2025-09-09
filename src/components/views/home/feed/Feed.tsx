import { useState} from "react";
import FullScreenModal from "../../../modals/FullScreenModal.tsx";
import Gallery from "./gallery/Gallery.tsx";
import PostCard from "./PostCard/PostCard.tsx";
import {postService} from "../../../../services/api/postService.ts";
import {AxiosError} from "axios";
import {errorService} from "../../../../services/util/errorService.ts";
import {useQuery} from "@tanstack/react-query";
import type {PostPicture} from "../../../../models/Post/postPicture.ts";


function Feed() {

    const [selectedPictures, setSelectedPictures] = useState<PostPicture[]>();
    const [selectedPictureIndex, setSelectedPictureIndex] = useState<number>()

    const { data: postList, error, isLoading } = useQuery({
        queryKey: ["postList"],      // identifiant du cache
        queryFn: postService.getAll,
        refetchOnWindowFocus: false,
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

    const openPicturesModal = (postPictures: PostPicture[], index: number) => {
        setSelectedPictures(postPictures);
        setSelectedPictureIndex(index);
    }

    const hidePicturesModal = () => {
        setSelectedPictures([]);
    }

    if (!postList || postList.length === 0) {
        return <p>Aucun post disponible</p>;
    }

    const postEltList = postList?.map((post) => (
                <PostCard post={post} key={post.id} openPicturesModal={openPicturesModal} />
            )
        )
        ??(<div>Aucun post disponible</div>)
    ;

    const modalContent = () => {

        if (selectedPictures == null || selectedPictures.length == 0 || selectedPictureIndex == null) {
            return (<div>Aucune photo disponible</div>);
        } else {
            const goToPreviousPicture = () => {
                if (selectedPictureIndex > 0) {
                    setSelectedPictureIndex(selectedPictureIndex - 1);
                }
            }

            const goToNextPicture = () => {
                if (selectedPictureIndex < (selectedPictures.length - 1)) {
                    setSelectedPictureIndex(selectedPictureIndex + 1);
                }
            }
            return (
                <Gallery
                    goToPreviousPicture={goToPreviousPicture}
                         goToNextPicture={goToNextPicture}
                         selectedPictures={selectedPictures} selectedPictureIndex={selectedPictureIndex}/>
            );
        }
    }

    return (
        <>
            <div className="block p-4">
                <div>{postEltList}</div>
            </div>
            {selectedPictures != null && selectedPictures.length > 0 &&
                <FullScreenModal close={hidePicturesModal} content={modalContent()}/>
            }
        </>

    );
}

export default Feed;