import React from 'react';
import './friends.scss';

class Friends extends React.Component {
  editFriend = (e) => {
    e.preventDefault();
    // const firebaseId = this.props.match.params.id;
    this.props.history.push('/friends/:id/edit');
  }

  render() {
    return (
      <div className="Friends">
        <h2>Friends Component</h2>
        <button className='btn btn-danger' onClick={this.editFriend}>Edit Friend</button>
      </div>
    );
  }
}

export default Friends;
