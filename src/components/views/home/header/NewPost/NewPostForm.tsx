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
    handleNewPostImagesChange: (value: File[]) => void
}) {

    const [previews, setPreviews] = useState([] as string[]);
    const fileInputRef = useRef<HTMLInputElement | null>(null)

    const handleSubmit = (e: FormEvent) => {
        onSubmit(e);
        setPreviews([]);
        fileInputRef.current!.value = "";
    }
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const fileList = [] as File[];
            const filePreviewList = [];
            for (const file of event.target.files) {
                fileList.push(file);
                filePreviewList.push(URL.createObjectURL(file));
            }
            handleNewPostImagesChange(fileList);
            setPreviews(filePreviewList);
        } else {
            handleNewPostImagesChange([]);
        }
    };
    const addPicture = () => {
        fileInputRef.current?.click()
    };

    const postDisabled = newPost.content.length === 0 && newPost.files.length === 0;

    return (
        <>
            <div className="max-w-xl mx-auto">
                <form onSubmit={handleSubmit}>
                    <TextAreaInput name="newPostContentInput" value={newPost.content}
                                   onChange={handleNewPostContentChange}/>
                    {previews.length > 0 &&
                        <div className="flex overflow-x-scroll">
                            {previews.map((img, index) => (
                                <img key={index} src={img} alt={"image_" + index}
                                     className="max-h-[5rem] object-contain rounded mr-2"/>
                            ))
                            }
                        </div>
                    }
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