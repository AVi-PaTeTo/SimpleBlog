
import filterIcon from "../assets/filter.png"
import PostPill from "../components/PostPill";
import { getPosts} from "../api/ApiFunctions";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Posts(){
    const [postData, setPostData] = useState([]);
    const [filterData, setFilterData] = useState("")
    const [searchText, setSearchText] = useState("")
    const navigate = useNavigate();

    useEffect(()=>{
        const fetchPost = async() =>
        {
            const data = await getPosts(filterData)
            setPostData(data)
        }
        fetchPost();
    }, [filterData])

    function handlePostClick(id){
        navigate(`/post-detail/${id}`)
    }

    const handleSearchEnter = () => {
        setFilterData(prevFilterData => ("?search="+searchText))
    }

    const handleChange = (e) => {
        setSearchText(e.target.value)
    }
    
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
        <div className="search">
            <input onKeyDown={(e) => {if(e.key === "Enter"){handleSearchEnter()}}} 
                    onChange={handleChange} name="search-bar" type="text" />

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