import { useDispatch, useSelector } from "react-redux";
import { loadPosts, addNewPost } from "../store/reducers/posts";
import { useEffect } from "react";
import { useForm } from 'react-hook-form'
import LoadingPage from './LoadingPage'

const Posts = () => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts.list);
    const notLoaded = useSelector((state) => state.posts.loading)
    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        dispatch(loadPosts());
    }, [dispatch]);

    if (!notLoaded) {
        return (
            <div className="contentWrapper">
                <h1>Posts</h1>
                <form onSubmit={handleSubmit((text) => {
                    dispatch(addNewPost({ text }))
                    {reset(
                        {
                          title: "",
                        })}
                })}>
                    <input {...register("title")} required minLength={3} placeholder="Enter text" />
                    <input type="submit" value='Add post' />
                </form>
                <ul className="postData">
                    {posts.map((post) => (
                        <li key={post.id}>{post.title}</li>
                    ))}
                </ul>
            </div>
        )
    } else {
        return (<LoadingPage />)
    }
};

export default Posts;