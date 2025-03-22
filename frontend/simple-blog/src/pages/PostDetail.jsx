

import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getPostById } from "../api/ApiFunctions"

function PostDetail() {
  const { id } = useParams(); // Extract the 'id' parameter
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSinglePost = async () => {
      setLoading(true);
      setError(null);
      try{
        const postData = await getPostById(id);
        setPost(postData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSinglePost();
  }, [id]);

  return (
    <div className='detail'>
      {post && (
        <>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </>
      )}
    </div>
  );
}

export default PostDetail;