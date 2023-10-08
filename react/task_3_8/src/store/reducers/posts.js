import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiCallBegan } from "../api";

const slice = createSlice({
    name: "posts",
    initialState: {
        list: [],
        loading: false,
    },

    reducers: {
        postsRequested: (posts, action) => {
            posts.loading = true;
        },

        postsReceived: (posts, action) => {
            posts.list = action.payload;
            posts.loading = false;
        },

        postsRequestFailed: (posts, action) => {
            posts.loading = false;
        },

        addOnePost: (posts,action)=>{
            posts.list.push(action.payload)
            posts.loading = false;
        }
    },
});

export default slice.reducer;

const { postsRequested, postsReceived, postsRequestFailed, addOnePost } = slice.actions;

const url = "/posts";

export const loadPosts = () => (dispatch) => {
    return dispatch(
        apiCallBegan({
            url,
            onStart: postsRequested.type,
            onSuccess: postsReceived.type,
            onError: postsRequestFailed.type,
        })
    );
};

export const addNewPost = createAsyncThunk(
    'posts/addNewPost',
    async function (text, {rejectWithValue, dispatch}) {
        try {
            const post = {
               title:text.text.title,
                body: 'empty',
                userId: 1
            };
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(post)
            });

            if (!response.ok) {
                throw new Error('Can\'t add post. Server error.');
            }

            const data = await response.json();
            dispatch(addOnePost(data));

        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);