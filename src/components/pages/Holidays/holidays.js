import React from 'react';
import './holidays.scss';

class Holidays extends React.Component {
  editHoliday = (e) => {
    e.preventDefault();
    this.props.history.push('/holidays/12345/edit');
  }

  render() {
    return (
      <div className="Holidays">
        <h2>Holidays Component</h2>
        <button className='btn btn-danger' onClick={this.editHoliday}>Edit Holiday</button>
      </div>
    );
  }
}

export default Holidays;
