import React from 'react';
import { Button } from '../html/button';

interface NewPostFormProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => void
    onCreate: (e: React.FormEvent) => void
}

const NewPostForm = (props: NewPostFormProps) => {

    return (
        <form method="POST">
            <div className="form-group">
                <input 
                    placeholder="titre" 
                    onChange={(e) => props.onChange(e)} 
                    type="text" 
                    name="title" 
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <textarea 
                    placeholder="Votre message" 
                    onChange={(e) => props.onChange(e)} 
                    name="content" 
                    className="form-control"></textarea>
            </div>
            <div className="form-group">
                <Button type="primary" onClick={props.onCreate}>Ajouter</Button>
            </div>
        </form>
    )
}

export default NewPostForm;