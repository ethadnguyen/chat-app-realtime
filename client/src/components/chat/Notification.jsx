import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';
import { unreadNotificationsFunc } from '../../utils/unreadNotifications';
import moment from 'moment';

const Notification = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useContext(AuthContext);
    const { notifications, userChats, allUsers, markAllNotificationsAsRead, markNotificationAsRead } = useContext(ChatContext);

    const unreadNotifications = unreadNotificationsFunc(notifications);
    const modifiedNotifications = notifications.map((n) => {
        const sender = allUsers.find((user) => user._id === n.senderId);

        return {
            ...n,
            senderName: sender?.name,
        };
    });

    return (
        <div className='notifications'>
            <div className='notifications-icon' onClick={() => setIsOpen(!isOpen)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chat-left-fill" viewBox="0 0 16 16">
                    <path d="M2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                </svg>
                {unreadNotifications?.length === 0 ? null : (
                    <span className='notification-count'>
                        <span>{notifications?.length}</span>
                    </span>
                )}
            </div>
            {isOpen ? (
                <div className='notifications-box'>
                    <div className="notifications-header">
                        <h3>Thông báo</h3>
                        <div
                            className='mark-as-read'
                            onClick={() => markAllNotificationsAsRead(notifications)}
                        >
                            Đánh dấu đã đọc tất cả
                        </div>
                    </div>
                    {modifiedNotifications?.length === 0 ? <span>Không có tin nhắn chờ</span> : null}
                    {modifiedNotifications && modifiedNotifications.map((n, index) => {
                        return (
                            <div
                                key={index}
                                className={n.isRead ? 'notification' : 'notification not-read'}
                                onClick={() => {
                                    markNotificationAsRead(n, userChats, user, notifications);
                                    setIsOpen(false);
                                }}
                            >
                                <span>{`${n.senderName} đã gửi 1 tin nhắn mới`}</span>
                                <span className='notification-time'>{moment(n.date).calendar()}</span>
                            </div>
                        )
                    })}
                </div>
            ) : null}
        </div>
    );
};

export default Notification