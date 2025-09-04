import {useState} from "react";
import Header from "./header/Header.tsx";
import Feed from "./feed/Feed.tsx";
import type {Post} from "../../../models/Post/post.ts";

const postContentList = new Array<Post>(
    {
        id: 1,
        content: "This is the first post",
        files: []
    },
    {
        id: 2,
        content: "This is the second post",
        files: []
    },
);

function Home() {
    const newEmptyPost = {content: "", files: [] as File[]};
    const [postList, setPostList] = useState(postContentList);

    const [newPost, setNewPost] = useState<Post>(newEmptyPost);

    const postBtnClick = () => {
        const tempPostList = [...postList];
        tempPostList.push({
            id: postList.length + 1,
            content: newPost.content,
            files: newPost.files,
        });
        setPostList(tempPostList);
        setNewPost(newEmptyPost);
    };

    const handleNewPostContentChange = (value: string) => {
        const tempPost = {...newPost};
        tempPost.content = value;
        setNewPost(tempPost);
    };

    const handleNewPostImagesChange = (value: File[]) => {
        const tempPost = {...newPost};
        tempPost.files = value;
        setNewPost(tempPost);
    };

    return (
        <>
            <Header newPost={newPost} postBtnClick={postBtnClick}
                    handleNewPostContentChange={handleNewPostContentChange}
                    handleNewPostImagesChange={handleNewPostImagesChange}
            />
            <Feed postList={postList}/>
        </>
    )
}

export default Home
