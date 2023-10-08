import { loadUserData } from "../store/reducers/userData";
import LoadingPage from './LoadingPage'

import { useParams } from "react-router-dom"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import '../assets/css/UserData.css'

const UserTodos = () => {
    const params = useParams()
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.userData.list);
    const notLoaded = useSelector((state) => state.userData.loading)

    useEffect(() => {
        dispatch(loadUserData(params.userId, 'todos'));
    }, [dispatch]);

    if (!notLoaded && userData.length > 0) {
        return (
            <div className="contentWrapper">
                <ul>
                    {userData.map((todo) => (
                        <li key={todo.id}>                            
                            <input id={todo.id} type="checkbox" className="checkbox" defaultChecked={todo.completed}/>                    
                            <label htmlFor={todo.id} className="checkboxLabel">{todo.title}</label>
                        </li>
                    ))}
                </ul>
            </div>
        )
    } else {
        return (<LoadingPage />)
    }
}

export default UserTodos;