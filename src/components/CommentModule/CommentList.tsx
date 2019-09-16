import React from 'react';
//import { Redirect } from 'react-router-dom';
import CommentItem from './CommentItem';
import NewComment from './NewComment';
import { UserContext } from "../../store/UserProvider";
import Comment from "../../interfaces/CommentInterface";
import Post from "../../interfaces/PostInterface";
import CommentStore from "../../store/CommentStore";


interface CommentListProps {
    post: Post;
    limit: number | 'all';
}

interface CommentListState{
    comments: Comment[];
    loaded: boolean;
    newComment: string;
    errors: string | null;
}

export default class CommentList extends React.Component<CommentListProps,CommentListState>
{   
    
    static contextType = UserContext;
    private CommentStore: CommentStore = new CommentStore();

    constructor(props: CommentListProps) {

        super(props);
        this.state = { 
            comments: [],
            loaded: false,
            newComment: '',
            errors: null
        }

        this.CommentStore.onChange((CommentStore: CommentStore) => {

            if (CommentStore.comments) {
                this.setState({comments: CommentStore.comments, loaded: true, newComment: ''})
            }
        })
    }
    

   componentDidMount() {

        let {post, limit} = this.props;
        this.CommentStore.getAll(post, limit);
    }

    handleInputChange = (content: string) => {

        this.setState({newComment: content});
    }

    handleCreate = (e: React.FormEvent) => {

        e.preventDefault();
        let {newComment} = this.state;

        this.CommentStore.create(newComment, this.props.post)
    }
    
    handleDelete = (comment: Comment) => {

        this.CommentStore.destroy(comment);
    }


    render() {

        let {comments, loaded} = this.state;
        
        return (
               
            <div className="comment-list card">
                <div className="card-body">       
                
                    { (loaded) &&
                        <div>
                            <h5 className="card-title">{ comments.length > 0 ? 'Commentaires' : 'Pas de commentaires pour le moment'}</h5>
                            {
                            comments.map((comment, index) => {
                                return <CommentItem key={`comment_${index}`} onDelete={this.handleDelete} comment={comment} />
                            })
                            }
                            {   
                            (this.context.user) &&
                            <NewComment 
                                content={this.state.newComment} 
                                onChange={this.handleInputChange} 
                                onCreate={this.handleCreate}
                            />
                            
                            }
                        </div>
                    }
                </div>
            </div>
              
        )
    }
}