import TextAreaInput from "../../../../inputs/TextAreaInput.tsx";
import {Send} from "lucide-react"
import {ImageUp, X} from "lucide-react"
import PrimaryBtn from "../../../../buttons/PrimaryBtn.tsx";
import MinorBtn from "../../../../buttons/MinorBtn.tsx";
import {type ChangeEvent, type FormEvent, useRef, useState} from "react";
import type {Post} from "../../../../../models/Post/post.ts";
import SecondaryBtn from "../../../../buttons/SecondaryBtn.tsx";
import {errorService} from "../../../../../services/util/errorService.ts";

function PostForm({onSubmit, post, handlePostContentChange, handlePostImagesChange, onCancel}: {
    onSubmit: (event: FormEvent) => void,
    post: Post,
    handlePostContentChange: (value: string) => void,
    handlePostImagesChange: (value: File[]) => void,
    onCancel: () => void
}) {

    const [previews, setPreviews] = useState([] as string[]);
    const fileInputRef = useRef<HTMLInputElement | null>(null)

    const handleSubmit = (e: FormEvent) => {
        onSubmit(e);
        setPreviews([]);
        fileInputRef.current!.value = "";
    }

    const checkFileListSize = (files: FileList) :boolean => {
        const maxFileSizeMB = import.meta.env.VITE_PICTURE_MAX_SIZE;
        const maxFileListSize = import.meta.env.VITE_PICTURE_MAX_TOTAL_SIZE;
        console.log(maxFileSizeMB);
        let totalSize = 0;
        for (const file of files) {
            if(file.size > (maxFileSizeMB * 1024 * 1024)){
                errorService.showErrorInAlert(new Error(`La taille maximale par image est de ${maxFileSizeMB} Mo`));
                return false;
            }
            totalSize += file.size;
        }
        if(totalSize > maxFileListSize * 1024 * 1024){
            errorService.showErrorInAlert(new Error(`La taille maximale totale des images est de ${maxFileListSize} Mo`));
            return false;
        }
        return true;
    }
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            if(!checkFileListSize(event.target.files)){
                return;
            }
            const fileList = [] as File[];
            const filePreviewList = [];
            for (const file of event.target.files) {
                fileList.push(file);
                filePreviewList.push(URL.createObjectURL(file));
            }
            handlePostImagesChange(fileList);
            setPreviews(filePreviewList);
        } else {
            handlePostImagesChange([]);
        }
    };
    const addPicture = () => {
        fileInputRef.current?.click()
    };

    const postDisabled = post.content.length === 0 && post.files.length === 0;

    return (
        <>
            <div className="max-w-xl mx-auto">
                <form onSubmit={handleSubmit}>
                    <TextAreaInput name="postContentInput" value={post.content}
                                   onChange={handlePostContentChange}/>
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
                                    extraClass="m-2 " submit={true}/>
                        <SecondaryBtn label="Annuler" extraClass="m-2 " icon={<X className="h-4 w-4"/>} onClick={onCancel}
                                    />
                    </div>
                </form>
            </div>
        </>
    );
}

export default PostForm;