import {useState} from "react";
import Header from "./header/Header.tsx";
import Feed from "./feed/Feed.tsx";
import type {Post} from "../../../models/Post/model.ts";

const postContentList = new Array<Post>(
    {
        id: 1,
        content: "This is the first post",
        images: ["image1.png", "image2.png"]
    },
    {
        id: 2,
        content: "This is the second post",
        images: []
    },
);

function Home() {
    const newEmptyPost = {content: "", images: [] as string[]};
    const [postList, setPostList] = useState(postContentList);

    const [newPost, setNewPost] = useState<Post>(newEmptyPost);

    const postBtnClick = () => {
        const tempPostList = [...postList];
        tempPostList.push({
            id: postList.length + 1,
            content: newPost.content,
            images: newPost.images,
        });
        setPostList(tempPostList);
        setNewPost(newEmptyPost);
    };

    const handleNewPostContentChange = (value: string) => {
        const tempPost = {...newPost};
        tempPost.content = value;
        setNewPost(tempPost);
    };

    const handleNewPostImagesChange = (value: string[]) => {
        const tempPost = {...newPost};
        tempPost.images = value;
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
