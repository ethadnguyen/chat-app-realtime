import { useEffect, useState } from 'react';
import { baseUrl, getRequest } from '../utils/services';

export const useFetchRecipient = (chat, user) => {
    const [recipient, setRecipient] = useState(null);
    const [error, setError] = useState(null);

    const recipientId = chat?.members?.find((id) => id !== user?._id);
    console.log('chat', chat);
    console.log('recipientId', recipientId);

    useEffect(() => {
        const getUser = async () => {
            if (!recipientId) return null;

            const response = await getRequest(`${baseUrl}/users/${recipientId}`);
            console.log('response', response);
            if (response.error) {
                return setError(error);
            }

            setRecipient(response);
        };

        getUser();
    }, [recipientId, error]);

    return { recipient };
};