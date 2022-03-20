import React, { useRef } from 'react';
import { Button, Input, Label } from 'reactstrap';

import { TelepartyClient } from 'teleparty-websocket-lib';
import { UserPrefs } from '../hooks/useUserPrefs';

interface IProps {
    client: TelepartyClient;
    create: (userPrefs: UserPrefs) => void;
    join: (roomId: string, userPrefs: UserPrefs) => void;
    userPrefs: UserPrefs;
};

/**
 * User can either join or create a chat room 
 */
const ChatRoomActions: React.FC<IProps> = ({ client, create, join, userPrefs }) => {
    const chatRoomRef = useRef<HTMLInputElement>(null);

    return(
        <div className='d-flex flex-row'>
            <div className='p-3'>
                <div>
                    <Label for='roomId'>Join Room</Label>
                    <Input id='roomId' type='text' innerRef={chatRoomRef} />
                    <Button 
                        className='mt-1'
                        onClick={() => {
                            if (!chatRoomRef.current) return;
                            join(chatRoomRef.current.value, userPrefs);
                        }}
                    >
                        Join Room
                    </Button>
                </div>
                <div>
                    <Button 
                        className='mt-1'
                        onClick={() => create(userPrefs)}
                    >
                        Create Room
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ChatRoomActions;
