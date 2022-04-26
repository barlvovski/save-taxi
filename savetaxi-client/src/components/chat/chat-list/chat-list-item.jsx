import React from 'react';

export const ChatListItem = ({ handleChannelSelect, chat }) => {
    console.log('chat', chat);
    return (
        <div className='channel-item' onClick={() => handleChannelSelect(chat)}>
            <div>{chat.chatId}</div>
        </div>
    );
};
