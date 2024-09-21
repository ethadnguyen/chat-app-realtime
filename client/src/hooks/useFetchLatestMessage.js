import { useContext, useEffect, useState } from 'react';
import { ChatContext } from '../context/ChatContext';
import { baseUrl, getRequest } from '../utils/services';



export const useFetchLatestMessage = (chat) => {
    const { newMessage, notifications } = useContext(ChatContext);
    const [latestMessage, setLatestMessage] = useState(null);

    useEffect(() => {
        const getMessages = async () => {
            const response = await getRequest(`${baseUrl}/messages/${chat?._id}`);

            if (response.error) {
                return console.log('Có lỗi xảy ra khi lấy tin nhắn mới nhất', response);
            }

            const lastMessage = response[response?.length - 1];

            setLatestMessage(lastMessage);
        };
        getMessages();
    }, [newMessage, notifications]);

    return { latestMessage };
};