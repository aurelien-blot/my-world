import './Header.css'
import TextAreaInput from "../../../inputs/TextAreaInput.tsx";

function Header({postBtnClick, newPostContent, handlePostContentChange}: {postBtnClick: () => void ,
    newPostContent: string, handlePostContentChange: (value : string) => void}) {

    return (
        <div className="mt-10">
            <h1>Welcome to My Website</h1>
            <div >
                <TextAreaInput name="newPostContentInput" value={newPostContent}  onChange={handlePostContentChange}/>
                <button onClick={postBtnClick} className="bg-blue-500" >Poster</button>
            </div>
        </div>
    );
}

export default Header;