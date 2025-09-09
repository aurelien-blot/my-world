import {Send} from "lucide-react"
import {type FormEvent, useState} from "react";
import PrimaryBtn from "../../../buttons/PrimaryBtn.tsx";
import PostForm from "./Post/PostForm.tsx";
import type {Post} from "../../../../models/Post/post.ts";
import {useAuth} from "../../../contexts/useAuth.tsx";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {postService} from "../../../../services/api/postService.ts";
import type {AxiosError} from "axios";
import {errorService} from "../../../../services/util/errorService.ts";

function Header() {
    const queryClient = useQueryClient();
    const [isNewPostAreaVisible, setIsNewPostAreaVisible] = useState(false);
    const { connectedUser, isAdmin } = useAuth();
    const newEmptyPost = {content: "", files: [] as File[], creationBy: connectedUser!};

    const [newPost, setNewPost] = useState<Post>(newEmptyPost);

    const postCreation = useMutation({
        mutationFn: (newPost: Post) => postService.create(newPost, newPost.files),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["postList"] });
            setNewPost({content: "", files: [] as File[], creationBy: connectedUser!});
        },
        onError: (error: AxiosError ) => {
            errorService.showErrorInAlert(error);
        },
    });

    const postBtnClick = () => {
        postCreation.mutate(newPost);
    };

    const showNewPostArea = () => {
        setIsNewPostAreaVisible(true);
    };

    const hideNewPostArea = () => {
        handlePostContentChange("");
        handlePostImagesChange([]);
        setIsNewPostAreaVisible(false);
    };

    const onSubmitForm = (event: FormEvent) => {
        event.preventDefault();
        postBtnClick();
        setIsNewPostAreaVisible(false);
    };

    const handlePostContentChange = (value: string) => {
        const tempPost = {...newPost};
        tempPost.content = value;
        setNewPost(tempPost);
    };

    const handlePostImagesChange = (value: File[]) => {
        const tempPost = {...newPost};
        tempPost.files = value;
        setNewPost(tempPost);
    };
    return (
        <>
            <div className="flex">
                <h1 className="flex-1 text-center p-4 text-2xl ">Bienvenue sur My World</h1>
                {isAdmin && <PrimaryBtn label="Nouveau Post"
                            onClick={showNewPostArea}
                            icon={<Send className="h-4 w-4"/>}
                            extraClass="fixed right-10 m-2 mt-4 md:mt-2 "
                />}
            </div>
            <div className={isNewPostAreaVisible ? "block p-4 " : "hidden"}>
                <PostForm onSubmit={onSubmitForm} post={newPost} onCancel={hideNewPostArea}
                             handlePostContentChange={handlePostContentChange}
                             handlePostImagesChange={handlePostImagesChange}  />
            </div>
        </>
    );
}

export default Header;