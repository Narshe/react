import React from 'react';
import NewCommentForm from './forms/NewCommentForm';


interface NewCommentProps {
    onCreate: (e: React.FormEvent) => void;
    onChange: (value: string) => void
    content: string;
}

const NewComment = (props: NewCommentProps) => {
    
    return (
        <div className="comment-form">
            <NewCommentForm 
                onCreate={props.onCreate}
                onChange={props.onChange}
                content={props.content}
            />
        </div>
    )
}

export default NewComment;
