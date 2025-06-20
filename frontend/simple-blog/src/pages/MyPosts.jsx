
import filterIcon from "../assets/filter.png"
import PostPill from "../components/PostPill";
import { getUserPosts } from "../api/ApiFunctions";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchAndSort from "../components/SearchSort";

function MyPosts(props){
    const [postData, setPostData] = useState([]);
    const [filterData, setFilterData] = useState("");
    const navigate = useNavigate();
   
    useEffect(()=>{
        const accessToken = localStorage.getItem("access_token")
        if (accessToken != null){
            const fetchPost = async() =>
            {
                const data = await getUserPosts(filterData);
                setPostData(data)
            }
            fetchPost();
        } else {
            navigate('/login');
        }
        
    }, [filterData])

    function handlePostClick(id){
        navigate(`/post-detail/${id}`)
    };

    const postObjects = postData.map(postItem => (<PostPill
                                                    postClick={() => handlePostClick(postItem.id)}
                                                    key = {postItem.id}
                                                    title = {postItem.title}
                                                    content = {postItem.content}
                                                    comment_count={postItem.comment_count}
                                                    public = {postItem.is_public}
                                                />))

    return(
        <>
        <SearchAndSort onFilterChange={setFilterData} />
        <div className="post-wrapper">
            {postObjects.length!=0? postObjects:
                <div className="no-posts"><h2>You don't have any posts yet.</h2></div>
            }
        </div>
        </>
    )
}

export default MyPosts