import React from 'react';
import { ChatListItem } from './chat-list-item';

export const ChatList = ({ chats, handleChannelSelect }) => {
    console.log('chats', chats);
    const getChats = () => {
        return chats.map((chat, i) => (
            <ChatListItem
                key={i}
                chat={chat}
                handleChannelSelect={handleChannelSelect}
            />
        ));
    };

    return (
        <div className='channel-list'>
            <h1>Chats</h1>
            {chats ? getChats() : `There is no chats to show`}
        </div>
    );
};
