import React, { Component } from 'react';
import './ReservationForm.css';

class ReservationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div>
        <h1>Reservation Form</h1>
        <form>
          <table>
            <tr>
              <td><label>
                Is going:
              </label></td>
              <td>
                <input
                  name="isGoing"
                  type="checkbox"
                  checked={this.state.isGoing}
                  onChange={this.handleInputChange} />
              </td>
            </tr>
            <tr>
              <td>
                <label>
                  Number of guests:
                </label>
              </td>
              <td>
                <input
                  name="numberOfGuests"
                  type="number"
                  value={this.state.numberOfGuests}
                  onChange={this.handleInputChange} />
              </td>
            </tr>
          </table>
        </form>
        <br />
        <hr />
        <h1>State</h1>
        <pre>
          {JSON.stringify(this.state)}
         </pre>


      </div>
    );
  }

}

export default ReservationForm;