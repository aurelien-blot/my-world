import type {Post} from "../../../../models/Post/model.ts";

function Feed({postList}: { postList: Post[] }) {
    const postEltList = postList.map((post) => (
                <div key={post.id}>
                    <p>{post.content}</p>
                    <p>{post.images.map((image) =>(
                        <span key={image}>{image} ; </span>
                        ))}</p>
                </div>
            )
        )
    ;

    return (
        <>
            <div className="flex">
                <div>{postEltList}</div>
            </div>
        </>

    );
}

export default Feed;