
import filterIcon from "../assets/filter.png"
import PostPill from "../components/PostPill";
import { getPosts } from "../api/ApiFunctions";
import { useEffect, useState } from "react";

function Posts(){
    const [postData, setPostData] = useState([])

    useEffect(()=>{
        const fetchPost = async() =>
        {
            const data = await getPosts()
            setPostData(data)
        }
        fetchPost();
    }, [])

    const postObjects = postData.map(postItem => (<PostPill
                                                    title = {postItem.title}
                                                    content = {postItem.content}
                                                />))
    return(
        <>
        <div className="search">
            <input type="text" />
            <div className="filter-dropdown">
                <button>
                    Filters
                    <img src={filterIcon} alt="" />
                </button>
            </div>
        </div>
        <div className="post-wrapper">
            {postObjects}
        </div>
        </>
    )
}

export default Posts