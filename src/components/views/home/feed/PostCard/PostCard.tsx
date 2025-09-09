import {CircleUser, Edit, Trash} from "lucide-react";
import type {Post} from "../../../../../models/Post/post.ts";
import {dateService} from "../../../../../services/util/dateService.ts";
import type {PostPicture} from "../../../../../models/Post/postPicture.ts";
import {useCallback, useState} from "react";
import PostCardPicture from "./PostCardPicture.tsx";
import {useAuth} from "../../../../contexts/useAuth.tsx";
import DangerBtn from "../../../../buttons/DangerBtn.tsx";
import PrimaryBtn from "../../../../buttons/PrimaryBtn.tsx";
import PostForm from "../../header/Post/PostForm.tsx";
import * as React from "react";
import {useMutation} from "@tanstack/react-query";
import {postService} from "../../../../../services/api/postService.ts";
import {AxiosError} from "axios";
import {errorService} from "../../../../../services/util/errorService.ts";

function PostCard({post, openPicturesModal, onDeletePostFct, onUpdatePostFct}: {
    post: Post,
    openPicturesModal: (pictureList: PostPicture[], index: number) => void,
    onDeletePostFct: (postId: number) => void,
    onUpdatePostFct: (post: Post) => void
}) {

    const { isAdmin } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [updatedPost, setUpdatedPost] = useState<Post|null>(null);

    const [pictureList, setPictureList] = useState<PostPicture[]>(() => {
        return post.pictureList?.map(p => ({...p})) ?? [];
    })

    const handleLoaded = useCallback((index: number, file: File) => {
        setPictureList(prev => prev.map((p, i) => (i === index ? { ...p, file } : p)));
    }, []);

    const deletePostPictureCall = useMutation({
        mutationFn: (requestParams: {postId :number, pictureId : number}) => postService.deletePostPicture(requestParams.postId, requestParams.pictureId),
        onError: (error: AxiosError,) => {
            errorService.showErrorInAlert(error);
        },
    });


    const deletePostFct = () => {
        //Dialog box
        if(window.confirm("Êtes-vous sûr de vouloir supprimer ce post ?")){
            onDeletePostFct(post.id!);
        }
    }

    const toggleEditing = () => {
        setIsEditing(!isEditing);
        if(!isEditing){
            const updatingPost ={...post};
            updatingPost.files=[];
            setUpdatedPost(updatingPost);
        } else {
            setUpdatedPost(null);
            setPictureList(post.pictureList?.map(p => ({...p})) ?? []);
        }

    }

    const onSubmitForm=(event: React.FormEvent) => {
        event.preventDefault();
        onUpdatePostFct(updatedPost!);
        toggleEditing();
    }
    const handlePostContentChange = (value: string) => {
        if(updatedPost){
            const tempPost = {...updatedPost};
            tempPost.content = value;
            setUpdatedPost(tempPost);
        }
    };

    const handlePostImagesChange = (value: File[]) => {
        if(updatedPost){
            const tempPost = {...updatedPost};
            tempPost.files = value;
            setUpdatedPost(tempPost);
        }
    };

    const onDeletePostPictureFct = (index: number) => {
        if(pictureList[index]==null){
            return;
        }
        const requestParams = {
            postId: post.id!,
            pictureId: pictureList[index].id!
        }
        deletePostPictureCall.mutate(requestParams);
        //On retire l'image de la liste
        setPictureList(prev => prev.filter((_, i) => i !== index));
    }
    return (
        <div key={post.id} className="max-w-xl mx-auto pl-4 pr-4 pt-1 pb-4
                mb-3 bg-blue-50 text-black
                border rounded border-gray-300">
            <div className="flex space-x-2">
                <CircleUser className="h-4 w-4"/>
                <span className="text-xs">{post.creationBy!.username}</span>
                <span className="text-xs">Le {dateService.formatDate(post.creationTime!)}</span>
                {isAdmin && !isEditing &&
                    <div className="ml-auto flex space-x-2">
                        <PrimaryBtn onClick={toggleEditing} icon={<Edit className="h-3 w-3"/>}
                                   tooltip="Modifier le post" label="" extraClass=""
                        />
                        <DangerBtn onClick={deletePostFct} icon={<Trash className="h-3 w-3"/>}
                                   tooltip="Supprimer le post" label="" extraClass=""
                        />
                    </div>
                }
            </div>

            {!isEditing &&
                <div>
                    <p className="whitespace-pre-wrap break-words">{post.content}</p>
                </div>
            }
            {isEditing &&
                <div>
                    <PostForm onSubmit={onSubmitForm} post={updatedPost!} onCancel={toggleEditing}
                                 handlePostContentChange={handlePostContentChange}
                                 handlePostImagesChange={handlePostImagesChange}  />
                </div>
            }
            {pictureList?.length > 0 &&
                <div className={`mt-5 flex  ${pictureList.length > 1 ? "overflow-x-scroll" : ""}`}>
                    {pictureList!.map((picture, index) => (
                        <PostCardPicture alt={"picture_" + index}
                                         index={index}
                                         onClick={() => openPicturesModal(pictureList, index)}
                                         key={`${post.id}_${picture.id}`}
                                         filePath={picture.filePath!}
                                         onDeletePostPictureFct={onDeletePostPictureFct}
                                         className="max-h-[15rem] object-contain rounded mr-2 hover:cursor-pointer"
                                         onLoaded={handleLoaded}/>
                    ))}
                </div>
            }

        </div>
    );
}

export default PostCard;