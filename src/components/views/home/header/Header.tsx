import {Send} from "lucide-react"
import {type FormEvent, useState} from "react";
import PrimaryBtn from "../../../buttons/PrimaryBtn.tsx";
import NewPostForm from "./NewPost/NewPostForm.tsx";
import type {Post} from "../../../../models/Post/post.ts";

function Header({postBtnClick, newPost, handleNewPostContentChange, handleNewPostImagesChange}: {
    postBtnClick: () => void,
    newPost: Post,
    handleNewPostContentChange: (value: string) => void,
    handleNewPostImagesChange: (value: File[]) => void
}) {
    const [isNewPostAreaVisible, setIsNewPostAreaVisible] = useState(false);

    const showNewPostArea = () => {
        setIsNewPostAreaVisible(true);
    };

    const hideNewPostArea = () => {
        handleNewPostContentChange("");
        handleNewPostImagesChange([]);
        setIsNewPostAreaVisible(false);
    };

    const onSubmitForm = (event: FormEvent) => {
        event.preventDefault();
        postBtnClick();
        setIsNewPostAreaVisible(false);
    };

    return (
        <>
            <div className="flex">
                <h1 className="flex-1 text-center p-4 text-2xl ">Welcome to My World</h1>
                <PrimaryBtn label="Nouveau Post"
                            onClick={showNewPostArea}
                            icon={<Send className="h-4 w-4"/>}
                            extraClass="fixed right-10 mt-4 md:mt-2 "
                />
            </div>
            <div className={isNewPostAreaVisible ? "block p-4 " : "hidden"}>
                <NewPostForm onSubmit={onSubmitForm} newPost={newPost} onCancel={hideNewPostArea}
                             handleNewPostContentChange={handleNewPostContentChange}
                             handleNewPostImagesChange={handleNewPostImagesChange}  />
            </div>
        </>
    );
}

export default Header;