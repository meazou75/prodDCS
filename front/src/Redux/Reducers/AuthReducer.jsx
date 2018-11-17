const INITIAL_STATE = {
    user: null
};

export default (state = INITIAL_STATE, action) => {
    console.log(action)
    switch (action.type) {
        case 'FEED_USER_META':
            return { ...state, user: action.payload };
        case 'CLEAR_USER_META':
            return { ...state, ...INITIAL_STATE };
        default:
            return state;
    }
};
