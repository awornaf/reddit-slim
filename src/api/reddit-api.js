export const API_ROOT = 'https://www.reddit.com';

// List of subreddits
export const getSubredditList = async () => {
    const response = await fetch(`${API_ROOT}`/getSubredditList.json);
    const json = await response.json();
    return json.data.childres.map((subreddit) => subreddit.data);
}

// Gets posts from inputted subreddits
export const getSubredditPosts = async (subreddit) => {
    const response = await fetch(`${API_ROOT}${subreddit}.json`);
    const json = await response.json();
    return json.data.children.map((post) => post.data);
}

// Gets comments from specific post
export const getComments = async (permalink) => {
    const response = await fetch(`${API_ROOT}${permalink}.json`);
    const json = await response.json();

    return json[1].data.children.map((subreddit) => subreddit.data);
}