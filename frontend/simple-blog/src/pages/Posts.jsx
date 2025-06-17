
import filterIcon from "../assets/filter.png"
import PostPill from "../components/PostPill";
import { getPosts, getUserPrivatePosts } from "../api/ApiFunctions";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Posts(props){
    const [postData, setPostData] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        const fetchPost = async() =>
        {
            const data = await (props.public? getPosts(): getUserPrivatePosts())
            setPostData(data)
        }
        fetchPost();
    }, [props.public])

    function handlePostClick(id){
        navigate(`/post-detail/${id}`)
    }

    const postObjects = postData.map(postItem => (<PostPill
                                                    postClick={() => handlePostClick(postItem.id)}
                                                    key = {postItem.id}
                                                    title = {postItem.title}
                                                    content = {postItem.content}
                                                    comment_count={postItem.comment_count}
                                                />))
    return(
        <>
        <div className="search">
            <input name="search-bar" type="text" />
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