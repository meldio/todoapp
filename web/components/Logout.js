import React from 'react';
import Relay from 'react-relay';
import meldio from '../meldio';

class Logout extends React.Component {
  _handleLogout = () => {
    meldio.logout()
      .catch(error => console.error('Logout failed: ', error) );
  }

  render() {
    return (
      <div className="profile-panel">
        <img className="profile-picture"
          src={this.props.viewer.profilePictureUrl} />
        <div className="name-container">
          <h3>{this.props.viewer.firstName}</h3>
        </div>
        <a className="logout-button" onClick={this._handleLogout}>
          Logout
        </a>
      </div>
    );
  }
}

export default Relay.createContainer(Logout, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        firstName,
        profilePictureUrl
      }
    `,
  },
});
