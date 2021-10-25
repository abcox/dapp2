import React, { Component } from 'react';
import Identicon from 'identicon.js';

class ProfileImage extends Component {
    render() {
        return (
            this.props.account ?
            <img alt={this.props.account}
                className="ml-2"
                height="30"
                src={`data:image/png;base64,${new Identicon(this.props.account, 30).toString()}`}
                width="30"/> :
            <span/>
        );
    }
}

export default ProfileImage;