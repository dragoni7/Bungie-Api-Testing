import React, { Component } from 'react'
import { BungieAuthService, BungieRequestService, store } from './services'

class Reducer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
            apiKey: props.apiKey
        }
    }

    onAuthorize = () => {
        return window.location.replace(
          `https://www.bungie.net/en/OAuth/Authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=code`,
        );
      };

    authorize = () => {
        return BungieAuthService(this.state.apiKey).then(authorization => {
            return BungieRequestService(
                authorization,
                this.state.apiKey,
                this.state.destinyMembership.membershipType
            )
        })
    }

    render() {
        return <div ref="client">{this.props.children({ store: this.state, actions: this })}</div>;
    }
}

export default Reducer;

