

import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getPostById, createComment, loadMoreComment } from "../api/ApiFunctions"
import Comment from '../components/Comment';
import { useUser } from '../context/userContext';
import deleteIcon from "../assets/trash.png";
import editIcon from "../assets/edit.png";

export default function PostDetail() {
  const { id } = useParams(); // Extract the 'id' parameter
  const [post, setPost] = useState({});
  const [commentText, setCommentText] = useState("")
  const [comments, setComments] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useUser();

  // const isAuthor = currentUser.id === post.user_id
  
  useEffect(() => {
    const fetchSinglePost = async () => {
      setLoading(true);
      setError(null);
      try{
        const postData = await getPostById(id);
        setPost(postData);
        setComments(postData.comments)
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSinglePost();
  }, [id]);

  const handleChange = (e) => {
          setCommentText(prevCommentText => e.target.value)
      }
  
  const handleSave = async (event) => {
              // event.preventDefault();
              const comment = {post: id, content: commentText};
              const response = await createComment(comment);
      };
  
  const loadMore = async(event) => {
    event.preventDefault();
    const pg = page + 1
    setPage(prevPage => prevPage+1)
    const moreComments = await loadMoreComment(id, pg)
    setComments(prevComments => ([...prevComments, ...moreComments]))
  }

  const commentObjects = comments.map(commentItem => (<Comment
                                                        key = {commentItem.id}
                                                        username = {commentItem.username}
                                                        content = {commentItem.content}
                                                    />))
  

  const accessToken = localStorage.getItem("access_token")
  console.log(accessToken)
  return (
    <>
      <div className='detail'>
          <div className='post'>
            {post && (
              <>
              <div className='post-header'>
                <h2>{post.title}</h2>
                {/* {isAuthor &&(<div className='post-customize'>
                  <button id='edit'><img  src={editIcon} alt="edit icon" /></button>
                  <button id='delete'><img  src={deleteIcon} alt="delete icon" /></button>
                </div>)} */}
              </div>
              <p>{post.content}</p>
              </>
            )}
          </div>
          
          <div className='comment-section'>
            <div className='comment-box'>
              <form action="">
                <input onChange={handleChange} type="text" name="comment" placeholder='Add a comment...'/>
                <button type='submit' onClick={handleSave}>Post</button>
              </form> 
            </div>  
            <div className='comment-list'>
              {commentObjects}
            </div>
            <button onClick={loadMore} className='load-comment' style={{ display: comments.length >= post.comment_count ? 'none' : 'block' }}>Load more</button>
          </div>
        
      </div>
        
    </>
    
  );
}

