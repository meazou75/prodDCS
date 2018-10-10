import React, { Component } from 'react';

import { removeNotification } from '../../Redux/Actions';

import { connect } from 'react-redux';

import './themes.css';

class Notification extends Component {
    constructor(props) {
        super();

        this.state = {
            hide: true
        };

        this.to = null;
        this.toNew = null;
        this.toHide = null;
    }

    componentWillUnmount() {
        clearTimeout(this.to);
        clearTimeout(this.toHide);
        clearTimeout(this.toNew);
        this.to = null;
        this.toNew = null;
        this.toHide = null;
    }

    componentDidMount() {
        this.toNew = setTimeout(() => this.setState({ hide: false }), 100);

        // Lifespan
        const lifeTime = 5; // 5s
        this.to = setTimeout(
            () => this.setState({ hide: true }),
            lifeTime * 1000 - 400
        );
        this.toHide = setTimeout(() => {
            this.props.removeNotification(this.props.id);
        }, lifeTime * 1000);
    }

    render() {
        return (
            <div
                className={
                    'DCS_notification ' +
                    (this.state.hide ? 'notifFadeOut' : 'notifFadeIn')
                }
                style={{ backgroundColor: this.props.color }}
                role="alert"
            >
                <button
                    type="button"
                    className="close"
                    data-dismiss="alert"
                    aria-label="Close"
                    onClick={() => {
                        this.setState({ hide: true });
                        clearTimeout(this.to);
                        clearTimeout(this.toHide);
                        clearTimeout(this.toNew);
                        this.to = setTimeout(
                            () => this.props.removeNotification(this.props.id),
                            400
                        );
                    }}
                >
                    <span aria-hidden="true">×</span>
                </button>
                {this.props.title}
            </div>
        );
    }
}

export default connect(
    null,
    {
        removeNotification
    }
)(Notification);
