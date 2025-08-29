import type {Post} from "../../../../models/Post/model.ts";

function Feed({postList}: { postList: Post[] }) {
    const postEltList = postList.map((post) => (
                <div key={post.id}>
                    <p>{post.content}</p>
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