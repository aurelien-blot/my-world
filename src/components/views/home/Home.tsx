import {useState} from "react";
import Header from "./header/Header.tsx";
import Feed from "./feed/Feed.tsx";
import type {Post} from "../../../models/Post/model.ts";

const postContentList = new Array<Post>(
    {
        id: 1,
        content: "This is the first post",
    },
    {
        id: 2,
        content: "This is the second post",
    },
);

function Home() {
    const [postList, setPostList] = useState(postContentList);
    const [newPostContent, setNewPostContent] = useState("");

    function postBtnClick() {
        const tempPostList = [...postList];
        tempPostList.push({
            id: postList.length + 1,
            content: newPostContent,
        });
        setPostList(tempPostList);
        setNewPostContent("");
    }

    function handlePostContentChange(value: string ) {
        setNewPostContent(value);
    }

    return (
        <>
            <Header handlePostContentChange={handlePostContentChange}
                    newPostContent={newPostContent} postBtnClick={postBtnClick}/>
            <Feed postList={postList}/>
        </>
    )
}

export default Home
