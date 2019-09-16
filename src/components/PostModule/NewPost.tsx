import React from 'react';
import { Redirect } from 'react-router-dom';
import NewPostForm from './NewPostForm';
import PostStore from '../../store/PostStore';


interface NewPostState {
    id: number | null;
    title: string;
    content: string;
    errors: string | null;
}


export default class NewPost extends React.PureComponent<{}, NewPostState>
{   
    private PostStore = new PostStore();

    constructor(props: NewPostState) {
        super(props);
        this.state = { 
            id: null, 
            title: '',
            content: '',
            errors: null
        }

        this.PostStore.onChange((store: PostStore) => {

            if(store.error !== '') {
                this.setState({errors: store.error})
            } else{
                this.setState({id: store.posts[0].id})
            }
          
        })
    }

    handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement|HTMLInputElement>) => {

        let {name, value} = e.target;
        
        this.setState({[name]: value} as any)
    }

    handleClick = (e: React.FormEvent) => {
        
        e.preventDefault();
        
        this.PostStore.create(this.state.title, this.state.content);
     
    }

    getErrors = () => {

        return this.state.errors && <div className="alert alert-danger">{this.state.errors}</div>
        
    }

    render() {

        let redirect = this.state.id && <Redirect to={`/posts/${this.state.id}`} />

        let error = this.getErrors();

        return (
            
            <div className="create-form">
                {redirect}
                {error}
                <NewPostForm onCreate={this.handleClick} onChange={this.handleInputChange}/>
            </div>
           
        )
    }
}