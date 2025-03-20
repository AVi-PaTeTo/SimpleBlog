
import filterIcon from "../assets/filter.png"
import PostPill from "../components/PostPill";

function Posts(){
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
            <PostPill/>
            <PostPill/>
        </div>
        </>
    )
}

export default Posts