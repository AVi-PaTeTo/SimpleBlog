import likeIcon from "../assets/like.png";
import commentIcon from "../assets/comment-dots.png";

export default function PostPill(props){
    return(
        <div className="post-pill">
        <div onClick={props.postClick} className="post-details">
            <h1>{props.title} {props.public? null:"(Private)"}</h1>
            <p className="content">{props.content}</p>
        </div>
        <div className="post-stats">
                <img id="comment" src={commentIcon} alt="" />{props.comment_count}
        </div>
        </div>
    )
}