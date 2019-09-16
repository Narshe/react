import React, {PureComponent} from 'react';
import { Link } from "react-router-dom";
//import Bootbox from 'bootbox';
import { UserContext } from "../../store/UserProvider";
import Post from '../../interfaces/PostInterface';
import { Button } from "../html/button";

interface Props {
    post: Post
    onDelete: (post: Post) => void
}

interface State {

}

export default class PostItem extends PureComponent<Props, State>
{

    static contextType  = UserContext;

    handleClick = () => {

        /*
        Bootbox.confirm({
            size: "medium",
            message: "Etes vous sur de vouloir supprimer cet article ?",
            callback: (confirm) => {

                confirm && 
            }
        })
        */

       this.props.onDelete(this.props.post);
    }   

    render() {

        let {post} = this.props;
        let value = this.context;
        return (
            <article className="article card">
                <div className="card-header article-header">
                    <div className="article-title">
                        <h5 className="card-title"><Link to={"/posts/"+post.id}>{post.title}</Link></h5>
                        De <Link to={`/profile/${post.user.id}`}><strong>{post.user.name}</strong></Link> - <em>{post.created_at}</em>
                    </div>
                    { (value.user && (value.user.id === post.user.id)) &&

                        <div className="article-options">
                            <Button type="danger" onClick={this.handleClick}>Supprimer</Button>
                        </div>
                    }
                </div>
               
                <div className="card-body">
                    {post.content}
                </div>
            </article>

        )
   }
}

 

