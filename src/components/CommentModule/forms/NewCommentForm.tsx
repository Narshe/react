import React from 'react';

import { Button } from '../../html/button';

interface NewCommentFormProps {
    onChange: (value: string) => void
    onCreate: (e: React.FormEvent) => void
    content: string;
}

const NewCommentForm = (props:NewCommentFormProps) => {

    return (
        <form method="POST">
            <div className="form-group">
                <textarea 
                    placeholder="Votre message" 
                    onChange={(e) => props.onChange(e.target.value)} 
                    name="content"
                    value={props.content}
                    className="form-control"></textarea>
            </div>
            <div className="form-group">
                <Button type="primary" onClick={props.onCreate}>Commenter</Button>
            </div>
        </form>
    )
}

export default NewCommentForm;