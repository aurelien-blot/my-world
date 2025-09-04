import {CircleUser} from "lucide-react";
import type {Post} from "../../../../../models/Post/post.ts";

function PostCard({post, openImagesModal}:{
    post : Post,
    openImagesModal: (files: File[], index: number) => void
}){
    return (
        <div key={post.id} className="max-w-xl mx-auto pl-4 pr-4 pt-1 pb-4
                mb-3 bg-blue-50 text-black
                border rounded border-gray-300">
            <div className="flex space-x-2">
                <CircleUser className="h-4 w-4"/>
                <span className="text-xs">Aurélien </span>
                <span className="text-xs">Le 05/08/2024 à 16h35</span>
            </div>
            <p className="">{post.content}</p>
            {post.files.length > 0 &&
                <div className={`mt-5 flex  ${post.files.length > 1 ? "overflow-x-scroll" : ""}`}>
                    {post.files.map((file, index) => (
                        <img key={index} src={URL.createObjectURL(file)} alt={"image_" + index}
                             onClick={() => openImagesModal(post.files, index)}
                             className="max-h-[15rem] object-contain rounded mr-2 hover:cursor-pointer"/>
                    ))
                    }
                </div>
            }
        </div>
    );
}
export default PostCard;