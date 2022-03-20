import { SocketMessageTypes, TelepartyClient } from 'teleparty-websocket-lib';

interface ChatRoomResult {
    sendMessage: (body: string, type: SocketMessageTypes) => void;
    updatePresence: (presence: boolean) => void;
};

/**
 * Chat room actions 
 */
const useChatRoom = (client: TelepartyClient): ChatRoomResult => {

    // Send new chat message
    const sendMessage = (body: string, type: SocketMessageTypes) => {
        client.sendMessage(type, { body });
    }

    // Update typing presencce
    const updatePresence = (presence: boolean) => client.sendMessage(SocketMessageTypes.SET_TYPING_PRESENCE, {
        typing: presence
    });

    return { sendMessage, updatePresence };
};

export { useChatRoom };
