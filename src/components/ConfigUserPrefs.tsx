import React, { useEffect, useRef, useState } from 'react';
import { Button, Input, Label } from 'reactstrap';

import { Option, UserPrefs } from '../hooks/useUserPrefs';

interface IProps {
    userPrefs: UserPrefs;
    updateUserPrefs: (option: Option, updatedValue: string) => void;
};

/**
 * Allows user to set nickname and icon 
 */
const ConfigUserPrefs: React.FC<IProps> = ({ userPrefs, updateUserPrefs }) => {
    const nicknameRef = useRef<HTMLInputElement>(null);
    const [userIcon, setUserIcon] = useState('');

    useEffect(() => {

    }, []);

    return (
        <div className='d-flex flex-row'>
            <div className='p-3'>
                <Label for='nickname'>Update Nickname</Label>
                <Input id='nickname' type='text' innerRef={nicknameRef}/>
                <Button 
                    className='mt-1' 
                    onClick={() => updateUserPrefs('nickname', nicknameRef.current?.value ?? '')}
                >
                    Update
                </Button>
            </div>
            <div className='p-3'>
                <Label for='userIcon'>Update Icon</Label>
                {/* Could not get the file upload to work :( */}
                <Input 
                    id='userIcon' 
                    type='file' 
                    accept='image/png'
                    onChange={({ target: { files }}) => files && setUserIcon(URL.createObjectURL(files[0]))}
                />
                <Button 
                    className='mt-1' 
                    onClick={() => {
                        if (!userIcon) return;

                        updateUserPrefs('userIcon', userIcon)
                    }}
                >
                    Update
                </Button>
            </div>
        </div>
    );
};

export default ConfigUserPrefs;
