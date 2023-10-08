import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../api";

const slice = createSlice({
    name: "userData",
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
    },
});

export default slice.reducer;

const { postsRequested, postsReceived, postsRequestFailed } = slice.actions;

export const loadUserData = (userId, requestType) => (dispatch) => {
    const url = `/users/${userId}/${requestType}`;
    
    return dispatch(
        apiCallBegan({
            url,
            onStart: postsRequested.type,
            onSuccess: postsReceived.type,
            onError: postsRequestFailed.type,
        })
    );
}
