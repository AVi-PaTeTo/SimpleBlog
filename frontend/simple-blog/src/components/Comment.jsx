
function Comment(props){
    return(
        <section className='comment'>
            <p><strong>{props.username}</strong></p>
            <p className='comment-content'>{props.content}</p>
        </section>
    )
}

export default Comment