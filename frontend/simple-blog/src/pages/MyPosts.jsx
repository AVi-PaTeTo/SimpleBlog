
import filterIcon from "../assets/filter.png"
import PostPill from "../components/PostPill";
import { getUserPosts } from "../api/ApiFunctions";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MyPosts(props){
    const [postData, setPostData] = useState([]);
    const [filterData, setFilterData] = useState("");
    const [searchText, setSearchText] = useState("")
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
                <div className="sort-modal">
                    <div>
                        <input type="radio" id="sort-date" name="sortOption" value="date"/>
                        <label htmlFor="sort-date">Date</label>
                    </div>

                    <div>
                        <input type="radio" id="sort-popularity" name="sortOption" value="popularity"/>
                        <label htmlFor="sort-popilarity">Popularity</label>
                    </div>
                    <div className="sort-direction">
                        <button id="ascending">Aesc</button>
                        <button id="descending">Desc</button>
                    </div>
                    <button>Apply</button>
                </div>
            </div>
            
        </div>
        <div className="post-wrapper">
            {postObjects.length!=0? postObjects:
                <div className="no-posts"><h2>You don't have any posts yet.</h2></div>
            }
        </div>
        </>
    )
}

export default MyPosts