import React from 'react';
import { Link } from "react-router-dom";
//import Bootbox from 'bootbox';
import { UserContext } from "../../store/UserProvider";
import Comment from "../../interfaces/CommentInterface";
import { Button } from "../html/button";

interface CommentItemProps {
    onDelete: (comment: Comment) => void
    comment: Comment;
}



export default class CommentItem extends React.Component<CommentItemProps, {}>
{   
    
    static contextType = UserContext;

    handleClick = (e: React.FormEvent) => {
        e.preventDefault();

        /*
        Bootbox.confirm({
            size: "medium",
            message: "Etes vous sur de vouloir supprimer ce commentaire  ?",
            callback: (confirm) => {
                confirm && 
            }
        }) 
        */
        this.props.onDelete(this.props.comment);
    }
    
    render() {

        let {comment} = this.props;
        
        return (
               
            <article className="comment card">
                <div className="card-header comment-header">
                    <div className="comment-info">
                        De <Link to={`/profile/${comment.user.id}`}><strong>{comment.user.name}</strong></Link> - <em>{comment.created_at}</em>
                    </div>
                    { this.context.user && (comment.user.id === this.context.user.id) &&
                        <div className="comment-options">
                            <Button type="danger" onClick={this.handleClick}>Supprimer</Button>
                        </div>
                    }
               
                </div>
                <div className="card-body">
                    {comment.content}
                </div>
            </article>
        )
    }
}
