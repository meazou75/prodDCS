export const cleanNotifications = () => {
    return {
        type: 'RESET_NOTIFICATION'
    };
};

export const removeNotification = index => {
    return {
        type: 'REMOVE_NOTIFICATION',
        payload: index
    };
};

export const addNotification = notification => {
    return {
        type: 'ADD_NOTIFICATION',
        payload: notification
    };
};
