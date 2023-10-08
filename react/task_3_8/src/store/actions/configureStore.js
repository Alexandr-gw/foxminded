import { combineReducers, configureStore } from "@reduxjs/toolkit";
import posts from "../reducers/posts";
import todos from "../reducers/todos";
import users from "../reducers/users";
import userData from "../reducers/userData";
import api from "../middleware/api";

export default function store() {
    const reducer = combineReducers({
        posts,
        todos,
        users,
        userData
    })
    return configureStore({
        reducer: reducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api),
    });
}