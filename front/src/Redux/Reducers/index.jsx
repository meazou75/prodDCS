import { combineReducers } from 'redux';

//import AuthReducer from './AuthReducer';
import NotificationReducer from './NotificationReducer';
import AuthReducer from './AuthReducer';

export default combineReducers({
    notification: NotificationReducer,
    auth: AuthReducer
});
