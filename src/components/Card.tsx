import React, { FunctionComponent } from 'react';

interface CardProps extends React.PropsWithChildren{
    title?: string,
  }

const Card: FunctionComponent<CardProps> = (props) => {
    
    return <div className="Card">
        {props.title && <div className='CardTitle'>{props.title}</div>}
        {props.children}
    </div>
}

export default Card;