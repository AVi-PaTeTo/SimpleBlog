import API from "./axios";

export const getPosts = async() => {
    const response = await API.get('/posts/');
    return response.data
}

export const createPost = async(postData) => {
    const response = await API.post("/posts/", postData)
}

export const getPostById = async(postId) => {
    const response = await API.get(`/posts/${postId}`)
    return response.data
}

export const getUserPrivatePosts = async() => {
    const response = await API.get('/posts/private_posts');
    return response.data
} 
