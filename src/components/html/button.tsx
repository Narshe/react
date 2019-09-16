import React from 'react';

interface buttonProps {
    type: string;
    onClick: any;
    children: React.ReactNode;

}

export const Button = (props: buttonProps) => {

    return <button className={`btn btn-${props.type}`} onClick={props.onClick}>{props.children}</button>
  
}