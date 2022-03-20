import React from 'react';
import { SessionChatMessage } from 'teleparty-websocket-lib';

interface IProps {
    message: SessionChatMessage;
    self: boolean;
};

/**
 * Message to be displayed in chat room 
 */
const Message: React.FC<IProps> = ({ message, self }) => {
    return (
        <div key={message.timestamp} className={self ? 'text-end' : 'text-start'}>
            <div className={`d-flex ${self ? 'flex-row-reverse' : 'flex-row'}`}>
                <p className='fw-bold'>
                    {message.userNickname}:
                </p>
                {message.userIcon && <img alt='img' src={message.userIcon}/>}
            </div>
            {message.body}
            < hr/>
        </div>
    );
};

export default Message;
