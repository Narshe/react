import React from 'react';

interface RegisterFormProps {
    onSubmit: (e: React.FormEvent) => void
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const RegisterForm = (props: RegisterFormProps) => {

    return (

        <form method="POST" onSubmit={props.onSubmit}>
            <div className="form-group">
                <input 
                    placeholder="username" 
                    onChange={props.onChange} 
                    type="text" 
                    name="username" 
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <input 
                    placeholder="password" 
                    onChange={props.onChange} 
                    type="password" 
                    name="password" 
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <input 
                    placeholder="email"
                    onChange={props.onChange}
                    type="email"
                    name="email" 
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <button type="submit" className="btn btn-primary">S'inscrire</button>
            </div>
        </form>
    )
}

export default RegisterForm;