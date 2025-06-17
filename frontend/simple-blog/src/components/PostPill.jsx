import likeIcon from "../assets/like.png";
import commentIcon from "../assets/comment-dots.png";

export default function PostPill(props){
    return(
        <div className="post-pill">
        <div onClick={props.postClick} className="post-details">
            <h1>{props.title}</h1>
            <p className="content">{props.content}</p>
        </div>
        <div className="post-stats">
                {/* <img id="like" src={likeIcon} alt="" />0 */}
                <img id="comment" src={commentIcon} alt="" />{props.comment_count}
        </div>
        </div>
    )
}