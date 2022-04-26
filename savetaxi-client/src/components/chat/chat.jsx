import React, { useEffect, useState } from 'react';
import { useAuth } from '../../auth/auth-provider';
import { fetcher } from '../../helpers/fetcher';
import { ChatList } from './chat-list/chat-list';
import './chat.scss';
import { MessagesPanel } from './messages-panel';

export const Chat = () => {
    const auth = useAuth();
    const [chats, setChats] = useState([]);
    const [currentChat, setCurrentChat] = useState();

    useEffect(() => {
        const getChatRooms = async () => {
            const chats = await fetcher(
                `http://localhost:3000/chats/user/${auth.user.username}`,
                'GET'
            );
            console.log(chats);
            setChats(chats);
            setCurrentChat(chats[0]);
        };
        if (auth.user) {
            getChatRooms();
        }
    }, [auth.user]);

    const handleChannelSelect = (chat) => {
        console.log(chat);
        console.log(`channel ${chat.chatId} selected`);
        setCurrentChat(chat);

        // socket.emit('channel-join', chat, (ack) => {});
    };

    return (
        <div className='chat-app'>
            <ChatList
                chats={chats}
                handleChannelSelect={handleChannelSelect}
            ></ChatList>
            <MessagesPanel chat={currentChat}></MessagesPanel>
        </div>
    );
};
