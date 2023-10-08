import { loadUserData } from "../store/reducers/userData";
import LoadingPage from './LoadingPage'

import { useParams } from "react-router-dom"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const UserAlbums = () => {
    const params = useParams()
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.userData.list);
    const notLoaded = useSelector((state) => state.userData.loading)

    useEffect(() => {
        dispatch(loadUserData(params.userId, 'albums'));
    }, [dispatch]);

    if (!notLoaded && userData.length > 0) {
        return (
            <div className="contentWrapper">
                <ul>
                    {userData.map((data) => (
                        <li key={data.id}>{data.title}</li>
                    ))}
                </ul>
            </div>
        )
    } else {
        return (<LoadingPage />)
    }
}

export default UserAlbums;