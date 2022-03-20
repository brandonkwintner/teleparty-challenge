import { useEffect, useState } from 'react';

import { TelepartyClient, SocketEventHandler, SessionChatMessage } from 'teleparty-websocket-lib';
import { UserPrefs } from './useUserPrefs';

interface WebSocketsResult {
    client?: TelepartyClient;
    create: (userPrefs: UserPrefs) => void;
    join: (roomId: string, userPrefs: UserPrefs) => void;
    messages: SessionChatMessage[];
    typing: boolean;
};

/**
 * Establish Web Socket connection with Teleparty
 */
const useWebSockets = (): WebSocketsResult => {
    const [client, setClient] = useState<TelepartyClient>();
    const [messages, setMessages] = useState<SessionChatMessage[]>([]);
    const [typing, setTyping] = useState(false);

    // Creates a new session
    const create = async (userPrefs: UserPrefs) => {
        if (!client) return;
        const roomId = await client.createChatRoom(userPrefs.nickname, userPrefs.userIcon);
        console.log(roomId);
    };

    // Joins existing session
    const join = async (roomId: string, userPrefs: UserPrefs) => {
        if (!roomId || !client) return;
        const prevMessages = await client.joinChatRoom(userPrefs.nickname, roomId, userPrefs.userIcon);
        setMessages([...prevMessages.messages, ...messages]);
    };

    // Initialize Teleparty client
    useEffect(() => {
        const eventHandler: SocketEventHandler = { 
            onConnectionReady: () => { console.log("Connection has been established") },
            onClose: () => { console.log("Socket has been closed") },
            onMessage: (message) => { 
                console.log("Received message:");
                console.log(message);

                const { data, type } = message;

                switch (type) {
                    case 'sendMessage':
                        // Case where we created or joined a session
                        if ( data.body === 'created the session' || data.body === 'joined') break;                        
                        setMessages(prev => [ ...prev, data ]);  
                        break;
                    case 'setTypingPresence':
                        setTyping(data.anyoneTyping);
                        break;
                    default:
                        break;
                }               
            }
        };
        const initializedClient = new TelepartyClient(eventHandler);
        setClient(initializedClient);

        return () => client?.teardown();
    }, []);

    return { client, create, join, messages, typing };
};

export { useWebSockets };
