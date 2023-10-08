import { loadUserData } from "../store/reducers/userData";
import LoadingPage from './LoadingPage'

import { useParams } from "react-router-dom"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const UserPosts = () => {
    const params = useParams()
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.userData.list);
    const notLoaded = useSelector((state) => state.userData.loading)

    useEffect(() => {
        dispatch(loadUserData(params.userId, 'posts'));
    }, [dispatch]);

    if (!notLoaded && userData.length > 0) {
        return (
            <div className="contentWrapper">
                <ul>
                    {userData.map((data) => (
                        <li key={data.id} className="postElement">
                            <p className="textDescription">Topic:</p>
                            <h5>{data.title}</h5>
                            <p className="textDescription">Content:</p>
                            <p>{data.body}</p>
                        </li>
                    ))}
                </ul>
            </div>
        )
    } else {
        return (<LoadingPage />)
    }
}

export default UserPosts;