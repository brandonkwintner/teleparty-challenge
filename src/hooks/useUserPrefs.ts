import { useState } from 'react';

export type UserPrefs = {
    nickname: string;
    userIcon: string;
}

export type Option = 'nickname' | 'userIcon';

interface UserPrefsResult {
    userPrefs: UserPrefs;
    updateUserPrefs: (option: Option, updatedValue: string) => void;
};

/**
 * Manage the state of nickname and user icon 
 */
const useUserPrefs = (): UserPrefsResult => {
    const [userPrefs, setUserPrefs] = useState<UserPrefs>({
        nickname: '',
        userIcon: ''
    });

    const updateUserPrefs = (option: Option, updatedValue: string) => {
        setUserPrefs({
            ...userPrefs,
            [option]: updatedValue
        });
    };

    return { userPrefs, updateUserPrefs };
};

export { useUserPrefs };
