import React, { useEffect, useState } from 'react';
import { fetcher } from '../../helpers/fetcher';
import { Message } from './message';
import classes from './messages-panel.module.css';
import { useAuth } from '../../auth/auth-provider';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3000');

export const MessagesPanel = ({ chat }) => {
    const auth = useAuth();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const getMessages = async () => {
            fetcher(`http://localhost:3000/chats/${chat.chatId}`, 'GET').then(
                (messages) => {
                    setMessages(messages);
                }
            );
        };

        if (chat?.chatId) {
            getMessages();
            socket.emit('join', chat.chatId);
            socket.on('message', (data) => {
                console.log('got message', data);
                setMessages((prev) => [...prev, data]);
            });
        }

        return () => {
            if (chat?.chatId) {
                socket.emit('exitChat', chat.chatId);
            }
        };
    }, [chat]);

    const getMessages = () => {
        if (messages.length === 0) {
            return (
                <div className='no-content-message'>
                    There is no messages to show
                </div>
            );
        }

        return messages.map((m, i) => <Message key={i} message={m}></Message>);
    };

    const handleSend = async (e) => {
        e.preventDefault();
        if (auth?.user) {
            console.log('send message', message);
            setMessages((messages) => [
                ...messages,
                { message, username: auth.user.username },
            ]);
            const data = {
                chatId: chat.chatId,
                username: auth.user.username,
                message,
            };
            socket.emit('message', data);
            await fetcher(`http://localhost:3000/chats/send`, 'POST', data);
            setMessage('');
        } else {
            alert('Please login to send messages');
        }
    };

    return (
        <div className='messages-panel'>
            <div className='meesages-list'>{getMessages()}</div>
            <div className='messages-input'>
                <form className={classes.form} onSubmit={handleSend}>
                    <input
                        type='text'
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button className={classes.button} type='submit'>
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
};
