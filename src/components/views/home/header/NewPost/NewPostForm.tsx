import TextAreaInput from "../../../../inputs/TextAreaInput.tsx";
import {Send} from "lucide-react"
import {ImageUp} from "lucide-react"
import PrimaryBtn from "../../../../buttons/PrimaryBtn.tsx";
import MinorBtn from "../../../../buttons/MinorBtn.tsx";
import {type ChangeEvent, type FormEvent, useRef, useState} from "react";
import type {Post} from "../../../../../models/Post/model.ts";

function NewPostForm({onSubmit, newPost, handleNewPostContentChange, handleNewPostImagesChange}: {
    onSubmit: (event: FormEvent) => void,
    newPost: Post,
    handleNewPostContentChange: (value: string) => void,
    handleNewPostImagesChange: (value: string[]) => void
}) {

    const [previews, setPreviews] = useState([] as string[]);
    const fileInputRef = useRef<HTMLInputElement | null>(null)

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        //TODO RETIRER

        if (event.target.files) {
            const fileNameList = [];
            const filePreviewList = [];
            for (const file of event.target.files) {
                fileNameList.push(file.name);
                filePreviewList.push(URL.createObjectURL(file));
            }
            handleNewPostImagesChange(fileNameList);
            setPreviews(filePreviewList);
        } else {
            handleNewPostImagesChange([]);
        }
    };
    const addPicture = () => {
        fileInputRef.current?.click()
    };

    const postDisabled = newPost.content.length === 0 && newPost.images.length === 0;

    return (
        <>
            <div className="max-w-xl mx-auto">
                <form onSubmit={onSubmit}>
                    <TextAreaInput name="newPostContentInput" value={newPost.content}
                                   onChange={handleNewPostContentChange}/>
                    <div>
                        {previews.length > 0 && previews.map((img, index) => (
                            <img key={index} src={img} alt={"image_"+index}
                                width={150}  className=""/>
                            ))
                        }
                    </div>
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
                        <PrimaryBtn label="Poster" icon={<Send className="h-4 w-4"/>} disabled={postDisabled}
                                    submit={true}/>
                    </div>
                </form>
            </div>
        </>
    );
}

export default NewPostForm;