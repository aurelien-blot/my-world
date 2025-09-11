import {useState} from "react";
import FullScreenModal from "../../../modals/FullScreenModal.tsx";
import Gallery from "./gallery/Gallery.tsx";
import PostCard from "./PostCard/PostCard.tsx";
import {postService} from "../../../../services/api/postService.ts";
import {AxiosError} from "axios";
import {errorService} from "../../../../services/util/errorService.ts";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import type {PostPicture} from "../../../../models/Post/postPicture.ts";
import type {Post} from "../../../../models/Post/post.ts";
import LoaderComponent from "../../../util/LoaderComponent.tsx";


function Feed() {

    const [selectedPictures, setSelectedPictures] = useState<PostPicture[]>();
    const [selectedPictureIndex, setSelectedPictureIndex] = useState<number>()
    const queryClient = useQueryClient();

    const {data: postList, error, isLoading} = useQuery({
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


    if (error) {
        errorService.showErrorInAlert(error as AxiosError);
    }

    const openPicturesModal = (postPictures: PostPicture[], index: number) => {
        setSelectedPictures(postPictures);
        setSelectedPictureIndex(index);
    }

    const deletePostCall = useMutation({
        mutationFn: (id: number) => postService.delete(id),
        onMutate: async (id) => {
            await queryClient.cancelQueries({queryKey: ["postList"]});
            const previous = queryClient.getQueryData<Post[]>(["postList"]);
            queryClient.setQueryData<Post[]>(["postList"], (old) =>
                (old ?? []).filter(p => p.id !== id)
            );
            return {previous};
        },
        onError: (error: AxiosError, _id, context) => {
            if (context?.previous) queryClient.setQueryData(["postList"], context.previous);
            errorService.showErrorInAlert(error);
        },
        onSettled: () => {
            queryClient.invalidateQueries({queryKey: ["postList"]});
        },
    });

    const updatePostCall = useMutation({
        mutationFn: (post: Post) => postService.update(post, post.files ?? []),
        onMutate: async (post) => {
            await queryClient.cancelQueries({queryKey: ["postList"]});
            const previous = queryClient.getQueryData<Post[]>(["postList"]);
            queryClient.setQueryData<Post[]>(["postList"], (old) =>
                (old ?? []).map(p => p.id === post.id ? {...post} : p)
            );
            return {previous};
        },
        onError: (error: AxiosError, _post, context) => {
            if (context?.previous) queryClient.setQueryData(["postList"], context.previous);
            errorService.showErrorInAlert(error);
        },
        onSettled: () => {
            queryClient.invalidateQueries({queryKey: ["postList"]});
        },
    });

    const deletePost = (postId: number) => {
        deletePostCall.mutate(postId)
    }
    const updatePost = (post: Post) => {
        updatePostCall.mutate(post)
    }
    const hidePicturesModal = () => {
        setSelectedPictures([]);
    }

    if (!postList || postList.length === 0) {
        return <p>Aucun post disponible</p>;
    }

    const picturesVersion = (post: Post) =>
        (post.pictureList ?? [])
            .map(pic => `${pic.id}:${post.pictureList?.length}`)
            .join('|');

    const postEltList = postList?.map((post) => (
                    <PostCard post={post} key={`${post.id}-${picturesVersion(post)}`}
                              openPicturesModal={openPicturesModal}
                              onUpdatePostFct={updatePost} onDeletePostFct={deletePost}/>
                )
            )
            ?? (<div>Aucun post disponible</div>)
    ;

    const modalContent = () => {

        const noPostPictures = selectedPictures == null || selectedPictures.length == 0 || selectedPictureIndex == null;
        const goToPreviousPicture = () => {
            if (selectedPictureIndex! > 0) {
                setSelectedPictureIndex(selectedPictureIndex! - 1);
            }
        }

        const goToNextPicture = () => {
            if (selectedPictureIndex! < (selectedPictures!.length - 1)) {
                setSelectedPictureIndex(selectedPictureIndex! + 1);
            }
        }

        return (
            <>
                {noPostPictures && <div>Aucune photo disponible</div>}
                {!noPostPictures &&
                    <Gallery
                        goToPreviousPicture={goToPreviousPicture}
                        goToNextPicture={goToNextPicture}
                        selectedPictures={selectedPictures!} selectedPictureIndex={selectedPictureIndex!}/>
                }
            </>
        );
    }

    return (
        <div className="h-[calc(100vh-7rem)] md:h-[calc(100vh-8rem)] overflow-auto">
            {isLoading && <LoaderComponent/>}
            {!isLoading &&
                <div className="block p-4">
                    <div>{postEltList}</div>
                </div>
            }
            {selectedPictures != null && selectedPictures.length > 0 &&
                <FullScreenModal close={hidePicturesModal} content={modalContent()}/>
            }
        </div>
    );
}

export default Feed;