import "./assets/css/App.css";

import {
    createBrowserRouter,
    Route,
    createRoutesFromElements,
    Link,
    Outlet,
    RouterProvider
} from 'react-router-dom'


//pages
import ErrorPage from './components/ErrorPage'
import Home from './components/Home'
import PostsList from './components/PostsList'
import TodoList from './components/TodoList'
import UserList from './components/UserList'
import LoadingPage from './components/LoadingPage'
import User from './components/User'
import UserPosts from './components/UserPosts'
import UserTodos from './components/UserTodos'
import UserAlbums from './components/UserAlbums'


//===

import { Provider } from "react-redux";
import configureStore from "./store/actions/configureStore";

function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<Root />}>
                <Route index element={<Home />} />
                <Route path="PostsList" element={<PostsList />} />
                <Route path="TodoList" element={<TodoList />} />
                <Route id="userList" path="UserList" element={<Outlet />}>
                    <Route index element={<UserList />} />
                    <Route id="user" path=":userId" element={<User />} >
                        <Route path="albums" element={<UserAlbums />} />
                        <Route path="todos" element={<UserTodos />} />
                        <Route path="posts" element={<UserPosts />} />
                    </Route>
                </Route>
                <Route path="LoadingPage" element={<LoadingPage />} />
                <Route path="/*" element={<ErrorPage />} />
            </Route>
        )
    )

    return (
        <div className="wrapper">
            <RouterProvider router={router} />
        </div>
    )
}

const Root = () => {
    const store = configureStore();

    return (
        <>
            <div>
                <Link to="/">Home</Link>
                <Link to="/PostsList">PostsList</Link>
                <Link to="/TodoList">TodoList</Link>
                <Link to="/UserList">UserList</Link>
            </div>
            <div>
                <Provider store={store}>
                    <Outlet />
                </Provider>
            </div>
        </>
    )
}


export default App