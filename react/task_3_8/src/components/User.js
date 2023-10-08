import { loadUsers } from "../store/reducers/users";
import LoadingPage from './LoadingPage'
import '../assets/css/User.css'

import { useParams, Link, Outlet, NavLink } from "react-router-dom"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faUser, faFile, faPaperPlane, faComment, faCompass } from '@fortawesome/free-regular-svg-icons'



const User = () => {
    const params = useParams()
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users.list);
    const notLoaded = useSelector((state) => state.users.loading)

    useEffect(() => {
        dispatch(loadUsers());
    }, [dispatch]);

    if (!notLoaded && users.length > 0) {
        const user = users.find(userData => {
            if (Number(userData.id) === Number(params.userId)) {
                return userData
            }
        })

        return (
            <div className="contentWrapper">
                <h2>User</h2>
                <Link to='/UserList'> go back </Link>
                <div className="userWrapper">
                    <div className="name">
                        <FontAwesomeIcon icon={faUser} />
                        <p>{user.name}</p>
                    </div>
                    <div className="email">
                        <FontAwesomeIcon icon={faEnvelope} />
                        <p>{user.email}</p>
                    </div>
                    <div className="phone">
                        <FontAwesomeIcon icon={faComment} />
                        <p>{user.phone}</p>
                    </div>
                    <div className="work">
                        <FontAwesomeIcon icon={faCompass} />
                        <div className="content">
                            <p>{user.address.street}</p>
                            <p>{user.address.city}</p>
                            <p>{user.address.zipcode}</p>
                        </div>
                    </div>
                    <div className="socials">
                        <FontAwesomeIcon icon={faPaperPlane} />
                        <div className="content">
                            <p>{user.username}</p>
                            <p>{user.website}</p>
                        </div>
                    </div>
                    <div className="segment">
                        <FontAwesomeIcon icon={faFile} />
                        <div className="content">
                            <p>{user.company.bs}</p>
                            <p>{user.company.catchPhrase}</p>
                            <p>{user.company.name}</p>
                        </div>
                    </div>
                </div>
                <div className="userActivitiesWrapper">
                    <nav className="tabs">
                        <NavLink to={`/UserList/${user.id}/albums`}> albums </NavLink>
                        <NavLink to={`/UserList/${user.id}/todos`}> todos </NavLink>
                        <NavLink to={`/UserList/${user.id}/posts`}>posts </NavLink>
                    </nav>
                    <Outlet />
                </div>
            </div>
        )
    } else {
        return (<LoadingPage />)
    }
}

export default User;