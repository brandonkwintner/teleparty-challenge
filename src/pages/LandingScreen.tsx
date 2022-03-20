import React from 'react';
import { Container } from 'reactstrap';

import ChatRoom from '../components/ChatRoom';
import ChatRoomActions from '../components/ChatRoomActions';
import ConfigUserPrefs from '../components/ConfigUserPrefs';

import { useUserPrefs } from '../hooks/useUserPrefs';
import { useWebSockets } from '../hooks/useWebSockets';

/**
 * Landing Screen View 
 */
const LandingScreen: React.FC = () => {
    const { client, create, join, messages, typing } = useWebSockets();
    const { updateUserPrefs, userPrefs } = useUserPrefs();

    // Will only render once client is defined
    return (
        client ? 
            <Container fluid>
                <div className='d-flex'>
                    <span className='h4 mx-auto'>Teleparty Chat</span>
                </div>

                {/* User config and chat room info*/}
                <ConfigUserPrefs updateUserPrefs={updateUserPrefs} userPrefs={userPrefs} />
                <ChatRoomActions 
                    client={client} 
                    create={create} 
                    join={join} 
                    userPrefs={userPrefs}
                />
                <hr/>

                {/* Chat Room */}
                <ChatRoom client={client} messages={messages} nickname={userPrefs.nickname} typing={typing}/>

            </Container> 
            : <></>
    );
};

export default LandingScreen;
