import API from "./axios";

export const getPosts = async() => {
    const response = await API.get('/posts/');
    return response.data
}

export const createPost = async(postData) => {
    const response = await API.post("/posts/", postData)
}