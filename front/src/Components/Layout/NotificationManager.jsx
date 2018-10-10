import React, { Component } from 'react';
import { connect } from 'react-redux';

import Notification from '../Themes/Notification';
import { cleanNotifications } from '../../Redux/Actions';

class NotificationManager extends Component {
    render() {
        const notificationsRender = () => {
            const result = this.props.notifications.map((notif, index) => {
                return (
                    <Notification key={index} id={index} title={notif.title} color={notif.color} />
                );
            });

            return result;
        };

        return (
            <div className="notifTopMost">
                {notificationsRender()}
            </div>
        );
    }
}

const mapStateToProps = ({ notification }) => {
    const { notifications } = notification;

    return { notifications };
};

export default connect(
    mapStateToProps,
    {
        cleanNotifications
    }
)(NotificationManager);
