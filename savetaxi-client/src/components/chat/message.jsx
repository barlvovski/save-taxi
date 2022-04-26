import React from 'react';

export const Message = ({ message }) => {
    return (
        <div className='message-item'>
            <div>
                <b>{message.username}</b>
            </div>
            <span>{message.message}</span>
        </div>
    );
};
