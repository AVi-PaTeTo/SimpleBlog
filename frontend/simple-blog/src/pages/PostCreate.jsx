import { useState, useEffect } from "react"
import { createPost } from "../api/ApiFunctions"
import DeletePopUp from "../components/DeletePopUp"

export default function CreatePost(){
    const [post, setPost] = useState({  
                                        title: "",
                                        content: ""
                                    })

    const handleChange = (e) => {
        setPost(prevPost => ({...prevPost, [e.target.name]: e.target.value}))
    }

    const handleSave = async (e) => {
            const isPublic = e.target.value === "true";
            const updatedPost = { ...post, is_public: isPublic };
            const response = await createPost(updatedPost);
    };

    return(
        <>
        <div className="create">
            <form action="">

                <input onChange={handleChange} id="title" name="title" type="text" placeholder="Title" />

                <textarea onChange={handleChange} id="content" name="content" rows={14} placeholder="Content"></textarea>

                <div className="button-container">
                    <button onClick={handleSave} value={false}>Save as Draft</button>
                    <button onClick={handleSave} value={true}>Submit</button>
                </div>
            </form>
        </div>

        </>
        
    )
}