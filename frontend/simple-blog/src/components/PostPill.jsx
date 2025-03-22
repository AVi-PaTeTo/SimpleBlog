import likeIcon from "../assets/like.png";
import commentIcon from "../assets/comment-dots.png";

export default function PostPill(props){
    return(
        <div onClick={props.postClick} className="post-pill">
            <h1>{props.title}</h1>
            <p>{props.content}</p>
            <div className="stats">
                <img id="like" src={likeIcon} alt="" />20
                <img id="comment" src={commentIcon} alt="" />6
            </div>
        </div>
    )
}