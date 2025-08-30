import TextAreaInput from "../../../../inputs/TextAreaInput.tsx";
import {Send} from "lucide-react"
import {ImageUp} from "lucide-react"
import PrimaryBtn from "../../../../buttons/PrimaryBtn.tsx";
import MinorBtn from "../../../../buttons/MinorBtn.tsx";
import {type ChangeEvent, type FormEvent, useRef} from "react";
import type {Post} from "../../../../../models/Post/model.ts";

function NewPostForm({onSubmit, newPost, handleNewPostContentChange, handleNewPostImagesChange}: {
    onSubmit: (event: FormEvent) => void,
    newPost: Post,
    handleNewPostContentChange: (value: string) => void,
    handleNewPostImagesChange: (value: string[]) => void
}) {

    const fileInputRef = useRef<HTMLInputElement | null>(null)

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const fileNameList = Array.from(event.target.files).map(file => file.name);
            handleNewPostImagesChange(fileNameList);
        } else {
            handleNewPostImagesChange([]);
        }
    };
    const addPicture = () => {
        fileInputRef.current?.click()
    };

    return (
        <>
            <div className="max-w-xl mx-auto">
                <form onSubmit={onSubmit}>
                    <TextAreaInput name="newPostContentInput" value={newPost.content}
                                   onChange={handleNewPostContentChange}/>
                    <div>
                      <input type="file" id="fileInput"
                             ref={fileInputRef}
                             multiple={true}
                             onChange={handleFileChange}
                             accept="image/*" className="hidden"/>
                        <MinorBtn onClick={addPicture} icon={<ImageUp className="h-4 w-4"/>}
                                  tooltip="Ajouter une photo"/>
                    </div>
                    <div className="flex justify-center">
                        <PrimaryBtn label="Poster" icon={<Send className="h-4 w-4"/>}
                                    submit={true}/>
                    </div>
                </form>
            </div>
        </>
    );
}

export default NewPostForm;