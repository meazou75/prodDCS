const INITIAL_STATE = {
    notifications: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'ADD_NOTIFICATION':
            return {
                ...state,
                notifications: [...state.notifications, action.payload]
            };
        case 'RESET_NOTIFICATION':
            return { ...state, ...INITIAL_STATE };
        case 'REMOVE_NOTIFICATION':
            return {
                ...state,
                notifications: [
                    ...state.notifications.slice(0, action.payload),
                    ...state.notifications.slice(action.payload + 1)
                ]
            };
        default:
            return state;
    }
};
