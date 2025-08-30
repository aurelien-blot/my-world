import TextAreaInput from "../../../inputs/TextAreaInput.tsx";
import {Send} from "lucide-react"
import {ImageUp} from "lucide-react"
import {type FormEvent, useState} from "react";
import PrimaryBtn from "../../../buttons/PrimaryBtn.tsx";
import MinorBtn from "../../../buttons/MinorBtn.tsx";

function Header({postBtnClick, newPostContent, handlePostContentChange}: {
    postBtnClick: () => void,
    newPostContent: string, handlePostContentChange: (value: string) => void
}) {
    const [isNewPostAreaVisible, setIsNewPostAreaVisible] = useState(false);

    const showNewPostArea = () => {
        setIsNewPostAreaVisible(true);
    };

    const submitNewPost = (event: FormEvent) => {
        event.preventDefault();
        postBtnClick();
        setIsNewPostAreaVisible(false);
    };

    const addPicture = () => {

    };

    return (
        <>
            <div className="flex">
                <h1 className="flex-1 text-center p-4 ">Welcome to My World</h1>
                <PrimaryBtn label="Nouveau Post"
                            onClick={showNewPostArea}
                            icon={<Send className="h-4 w-4"/>}
                            extraClass="fixed right-10 "
                />
            </div>
            <div className={isNewPostAreaVisible ? "block p-4 " : "hidden"}>
                <div className="max-w-xl mx-auto">
                    <form onSubmit={submitNewPost}>
                        <TextAreaInput name="newPostContentInput" value={newPostContent}
                                       onChange={handlePostContentChange}/>
                        <div>
                            <MinorBtn onClick={addPicture} icon={<ImageUp className="h-4 w-4"/>}
                                      tooltip="Ajouter une photo"/>
                        </div>
                        <div className="flex justify-center">
                            <PrimaryBtn label="Poster" icon={<Send className="h-4 w-4"/>}
                            submit={true}/>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Header;