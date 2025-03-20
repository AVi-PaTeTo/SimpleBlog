import likeIcon from "../assets/like.png";
import commentIcon from "../assets/comment-dots.png";

export default function PostPill(){
    return(
        <div className="post-pill">
            <h1>The Future of AI</h1>
            <p>Artificial Intelligence is shaping the future of technology. From self-driving cars to automated customer service, AI is everywhere.</p>
            <div className="stats">
                <img id="like" src={likeIcon} alt="" />20
                <img id="comment" src={commentIcon} alt="" />6
            </div>
        </div>
    )
}