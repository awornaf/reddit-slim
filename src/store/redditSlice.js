import { createSlice, createSelector } from '@reduxjs/toolkit';
import { getSubredditPosts } from '../api/reddit-api';

const initialState = {
    posts: [],
    searchTerm: '',
    selectedSubreddit: '/r/cyberpunk/',
    isLoading: false,
    error: false,
};

const redditSlice = createSlice({
    name: 'redditPosts',
    initialState,
    reducers: {
        setPosts(state, action) {
            state.posts = action.payload;
        },
        startGetPosts(state) {
            state.isLoading = true;
            state.error = false;
        },
        getPostsSuccess(state, action) {
            state.isLoading = false;
            state.posts = action.payload;
        },
        getPostsFailed(state) {
            state.isLoading = false;
            state.error = true;
        },
        setSearchTerm(state, action) {
            state.searchTerm = action.payload;
        },
        setSelectedSubreddit(state, action) {
            state.selectedSubreddit = action.payload;
            state.searchTerm = '';
        },
    },
});

export const {
    setPosts,
    getPostsFailed,
    getPostsSuccess,
    startGetPosts,
    setSearchTerm,
    setSelectedSubreddit,
} = redditSlice.actions;

export default redditSlice.reducer;

export const fetchPosts = (subreddit) => async (dispatch) => {
    try{
        dispatch(startGetPosts());
        const posts = await getSubredditPosts(subreddit);
        const postsWithMetaData = posts.map((post) => ({
            ...post,
        }))
        dispatch(getPostsSuccess(postsWithMetaData));
    } catch (e) {
        dispatch(getPostsFailed());
    }
};

const selectPosts = (state) => state.reddit.posts;
const selectSearchTerm = (state) => state.reddit.searchTerm;
export const selectSelectedSubreddit = (state) => state.reddit.selectedSubreddit;
export const selectFilteredPosts = createSelector([selectPosts, selectSearchTerm],
    (posts, searchTerm) => {
        if (searchTerm !== ''){
            return posts.filter((post) => post.title.toLowerCase().includes(searchTerm.toLowerCase()));
        }
        return posts;
    });