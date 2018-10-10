import { combineReducers } from 'redux';

//import AuthReducer from './AuthReducer';
import NotificationReducer from './NotificationReducer';

export default combineReducers({
    notification: NotificationReducer
});
