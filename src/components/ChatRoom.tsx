import React, { useEffect, useRef, useState } from 'react';
import { Button, Container, Input, Label } from 'reactstrap';
import { SessionChatMessage, SocketMessageTypes, TelepartyClient } from 'teleparty-websocket-lib';

import { useChatRoom } from '../hooks/useChatRoom';
import Message from './Message';

interface IProps {
    client: TelepartyClient;
    messages: SessionChatMessage[];
    nickname: string;
    typing: boolean;
};

/**
 * Chat room portion of screen 
 */
const ChatRoom: React.FC<IProps> = ({ client, messages, nickname, typing: SHOW_TYPING }) => {
    const [typing, setTyping] = useState(false);
    const messageRef = useRef<HTMLInputElement>(null);
    const { sendMessage, updatePresence } = useChatRoom(client);

    useEffect(() => {
        updatePresence(typing);
    }, [typing, updatePresence]);

    return (
        <Container fluid className='p-3 border border-dark'>
            <span className='h4'>Chat Room:</span>
            <Container fluid className='border border-dark mb-3' style={{ minHeight: 300 }}>
                {messages.map((message) => (
                    <div key={message.timestamp}>
                        <Message message={message} self={message.userNickname === nickname} />
                    </div>
                ))}
                {SHOW_TYPING && <span>User is typing...</span>}
            </Container>
            <Label for='chatbox'>Enter Message</Label>
            <Input 
                id='chatbox' 
                innerRef={messageRef} 
                type='text' 
                onChange={() => {
                    if (!messageRef.current) return;
                    if (!messageRef.current.value) setTyping(false);
                    else setTyping(true);
                }}
            />
            <Button
                className='mt-1'
                onClick={() => {
                    if (!messageRef.current) return;
                    sendMessage(messageRef.current.value, SocketMessageTypes.SEND_MESSAGE);
                    setTyping(false);
                    messageRef.current.value = '';
                }}
            >
                Send Message
            </Button>
        </Container>
    );
};

export default ChatRoom;
