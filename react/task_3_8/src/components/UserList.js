import { useDispatch, useSelector } from "react-redux";
import { loadUsers } from "../store/reducers/users";
import { useEffect } from "react";
import LoadingPage from './LoadingPage'
import {
  Link,
} from 'react-router-dom'

const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.list);
  const notLoaded = useSelector((state) => state.users.loading)

  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);

  if (!notLoaded) {
    return (
      <div className="contentWrapper">
        <h1>Users</h1>
        <ul className="userData">
          {users.map((user) => (
            <Link key={`${user.id}`} to={`/UserList/${user.id}/albums`} >
              <li>
                Name: <i>{user.name}</i>; UserName: <i>{user.username}</i>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    )
  } else {
    return (<LoadingPage />)
  }
}

export default UserList;