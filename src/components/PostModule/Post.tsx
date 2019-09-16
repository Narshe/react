import React from 'react';
import { Redirect, match } from "react-router-dom";
import PostItem from './PostItem';
import CommentList from '../CommentModule/CommentList';
import PostStore from '../../store/PostStore';
//import NewComment from '../CommentModule/newComment';

import PostInterface from '../../interfaces/PostInterface';

interface Params {
    id?: string;
}

interface Props{
    post?: PostInterface;
    limit?: number | 'all';
    match?: match<Params>;
}

interface State {
    post: PostInterface | null;
    redirect: boolean;
    loaded: boolean;
}

export default class Post extends React.PureComponent<Props, State>
{

    private PostStore = new PostStore();

    constructor(props: Props) {
        super(props);
        this.state = {
            post: null,
            redirect: false,
            loaded: false
        }

        this.PostStore.onChange((store) => {

            this.setState({post: store.posts[0], loaded: true});
        })
    }

    
    componentDidMount() {

        if (this.props.post) {
            return this.setState({post: this.props.post, loaded: true})
        }
        
        if (this.props.match && this.props.match.params.id)
        this.PostStore.getPost(parseInt(this.props.match.params.id));
        
    }
    

    handleDelete = (post: PostInterface) => {
        
        this.PostStore.destroy(post);
    }

    render() {

        let redirect = this.state.redirect  && <Redirect to={`/posts`} />;
        let limit = this.props.limit || 'all';
        let {post, loaded} = this.state;
        
        return (

            <React.Fragment>
                { (loaded && post) &&
                    <div className="article">
                        {redirect}
                        <PostItem onDelete={this.handleDelete} post={post} />
                        <CommentList limit={limit} post={post}/>
                    </div>
                }
            </React.Fragment>

        )
   }
}

 

