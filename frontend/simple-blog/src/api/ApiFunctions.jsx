import API from "./axios";

export const getPosts = async(filterData) => {
    const response = await API.get(`/posts/${filterData}`);
    return response.data
}

export const createPost = async(postData) => {
    const response = await API.post("/posts/", postData)
}

export const deletePost = async(postId) => {
    const response = await API.delete(`/posts/${postId}/`)
    return response
}

export const updatePost = async(postId, postData) => {
    const response = await API.put(`/posts/${postId}/`,postData)
    return response
}

export const getPostById = async(postId) => {
    const response = await API.get(`/posts/${postId}`)
    return response.data
}

export const getUserPosts = async(filterData) => {
    const response = await API.get(`/posts/user_posts/${filterData}`);
    return response.data
} 

export const createComment = async(commentData) => {
    const response = await API.post("/comments/", commentData)
}

export const loadMoreComment = async(postId, pageNumber) => {
    const response = await API.get(`/posts/${postId}/?comment_page=${pageNumber}`)
    return response.data.comments
}
