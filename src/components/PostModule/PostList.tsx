import React, {PureComponent} from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../store/UserProvider";
import Post from "../../interfaces/PostInterface";
import PostStore from "../../store/PostStore";
import PostItem from "./PostItem";

interface Props {

}

interface State {
    posts: Post[];
    loaded: boolean;
}

export default class PostList extends PureComponent<Props, State>
{
    private PostStore = new PostStore();
    static contextType  = UserContext;
    
    constructor(props: Props) {
        super(props);

        this.state = {
            posts: [],
            loaded: false
        }

        this.PostStore.onChange((store) => {

            this.setState({posts: store.posts, loaded:true})
        })
    }

    componentDidMount () {
        this.PostStore.getAll()
    }


    handleDelete = (post: Post) => {
        this.PostStore.destroy(post)
    }

    render() {
        const {posts, loaded} = this.state
        return (

            <div className="article-list">
                { loaded &&
                    posts.map((post, index) => {
                        return <PostItem onDelete={this.handleDelete} post={post} key={`post_${index}`} />
                    })
                }
                {
                   this.context.user && <Link className="btn btn-primary" to='/posts/new'>Ajouter article</Link>
                }

            </div>
        
        )
   }
}

 

