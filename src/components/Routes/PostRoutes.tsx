import React from 'react';
import { Route, Switch } from "react-router-dom";
import PostList from '../PostModule/PostList';
import Post from '../PostModule/Post';
import NewPost from '../PostModule/NewPost';

const PostRoutes = () => {

    return (
        <Switch>
            <Route path="/posts" exact component={PostList} />
            <Route path="/posts/new" exact component={NewPost} />
            <Route path="/posts/:id" component={Post} />
        </Switch>
    )
}


export default PostRoutes;