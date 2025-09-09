import {CircleUser} from "lucide-react";
import type {Post} from "../../../../../models/Post/post.ts";
import {dateService} from "../../../../../services/util/dateService.ts";
import type {PostPicture} from "../../../../../models/Post/postPicture.ts";
import {useCallback, useState} from "react";
import PostCardPicture from "./PostCardPicture.tsx";

function PostCard({post, openPicturesModal}: {
    post: Post,
    openPicturesModal: (pictureList: PostPicture[], index: number) => void
}) {

    const [pictureList, setPictureList] = useState<PostPicture[]>(() => {
        return post.pictureList?.map(p => ({...p})) ?? [];
    })

    const handleLoaded = useCallback((index: number, file: File) => {
        setPictureList(prev => prev.map((p, i) => (i === index ? { ...p, file } : p)));
    }, []);

    return (
        <div key={post.id} className="max-w-xl mx-auto pl-4 pr-4 pt-1 pb-4
                mb-3 bg-blue-50 text-black
                border rounded border-gray-300">
            <div className="flex space-x-2">
                <CircleUser className="h-4 w-4"/>
                <span className="text-xs">{post.creationBy!.username}</span>
                <span className="text-xs">Le {dateService.formatDate(post.creationTime!)}</span>
            </div>
            <p className="">{post.content}</p>
            {pictureList?.length > 0 &&
                <div className={`mt-5 flex  ${pictureList.length > 1 ? "overflow-x-scroll" : ""}`}>
                    {pictureList!.map((picture, index) => (
                        <PostCardPicture alt={"picture_" + index}
                                         index={index}
                                         onClick={() => openPicturesModal(pictureList, index)}
                                         key={`${post.id}_${picture.id}`}
                                         filePath={picture.filePath!}
                                         className="max-h-[15rem] object-contain rounded mr-2 hover:cursor-pointer"
                                         onLoaded={handleLoaded}/>
                    ))}
                </div>
            }
        </div>
    );
}

export default PostCard;