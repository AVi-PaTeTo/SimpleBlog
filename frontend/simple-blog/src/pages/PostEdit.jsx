import { useState, useEffect, use } from "react"
import { useNavigate, useParams } from 'react-router-dom';
import { updatePost } from "../api/ApiFunctions"
import { getPostById } from "../api/ApiFunctions";

export default function EditPost(props){
    const {id} = useParams();
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [post, setPost] = useState({  
                                        title: "",
                                        content: "",
                                        is_public: false
                                    })
    


    useEffect(() => {
        const fetchSinglePost = async () => {
          setLoading(true);
          setError(null);
          try{
            const postData = await getPostById(id);
            console.log(postData)
            setPost({  
                        title: postData.title,
                        content: postData.content,
                        is_public: postData.is_public
                    });
            
          } catch (err) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
        };
        fetchSinglePost();
      }, []);     

    const handleChange = (e) => {
        setPost(prevPost => ({...prevPost, [e.target.name]: e.target.value}))
    }

    const handleSave = async (e) => {
            const response = await updatePost(id, post);
            navigate(`/post-detail/${id}`)
    };

    const handleCheckbox = () =>{
        setPost(prevPost => ({...prevPost, is_public: !prevPost.is_public}))
    }

    return(
        <>
        <div className="create">
            <form action="">

                <input onChange={handleChange} id="title" name="title" type="text" placeholder="Title" value={post.title}/>

                <textarea onChange={handleChange} id="content" name="content" rows={14} placeholder="Content" value={post.content}></textarea>

                <div className="edit-checkbox">
                    <input onChange={handleCheckbox} id="public-checkbox" className="public-checkbox" type="checkbox" checked={!post.is_public}/>
                    <label htmlFor="public-checkbox">Private</label>
                </div>
                <div className="button-container">
                    <button onClick={handleSave}>Submit</button>
                </div>
            </form>
        </div>

        </>
        
    )
}