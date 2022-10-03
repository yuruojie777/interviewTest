import './Post.scss';
const Post = (props)=>{
    return(
        <>
        <div className="post-container">
            <h3>{props.post.title}</h3>
                <p>
                    {props.post.body}
                </p>
        </div>
        </>
    )
}

export default Post;