

import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { getPostById, createComment, loadMoreComment } from "../api/ApiFunctions"
import Comment from '../components/Comment';
import { useUser } from '../context/userContext';
import deleteIcon from "../assets/trash.png";
import editIcon from "../assets/edit.png";
import { deletePost } from '../api/ApiFunctions';
import DeletePopUp from '../components/DeletePopUp';

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [commentText, setCommentText] = useState("")
  const [comments, setComments] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { currentUser } = useUser();
  const [popupVisible, setPopupVisible] = useState(false)

  const isAuthor = currentUser.id === post.user_id
  
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
  
  const handleDeleteButton = () =>{
    setPopupVisible(true)
  } 

  const handlePopupButton = async(e) =>{
    if (e.target.value === 'cancel') {
      setPopupVisible(false)
    } else if (e.target.value === 'confirm'){
      try {
        const response = await deletePost(id);
        if (response.status === 200 || response.status === 204) {
          setPopupVisible(false);
          navigate('/');
        } else {
          throw new Error("Failed to delete post");
        }
      } catch (err) {
        setError(err.message);
        setPopupVisible(false)
      }
    }
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
      {popupVisible && (<DeletePopUp 
        onClick={handlePopupButton}  
      />)}
      <div className='detail'>
          <div className='post'>
            {post && (
              <>
              <div className='post-header'>
                <h2>{post.title}</h2>
                {isAuthor &&(<div className='post-customize'>
                  <button id='edit'><img  src={editIcon} alt="edit icon" /></button>
                  <button onClick={handleDeleteButton} id='delete'><img  src={deleteIcon} alt="delete icon" /></button>
                </div>)}
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

