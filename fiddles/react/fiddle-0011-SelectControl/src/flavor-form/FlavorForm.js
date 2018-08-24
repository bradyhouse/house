import React, { Component } from 'react';
import './FlavorForm.css'

class FlavorForm extends Component {

  constructor(props) {
    super(props);
    this.state = {value: 'coconut'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Your favorite flavor is: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <h1>Flavor Form</h1>
        <form onSubmit={this.handleSubmit}>
          <table>
            <tr>
              <td><label>
                Pick your favorite flavor:
              </label></td>
              <td>
                <select value={this.state.value} onChange={this.handleChange}>
                  <option value="grapefruit">Grapefruit</option>
                  <option value="lime">Lime</option>
                  <option value="coconut">Coconut</option>
                  <option value="mango">Mango</option>
                </select>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <input type="submit" value="Submit" />
              </td>
            </tr>
          </table>
        </form>
      </div>
    );
  }
}

export default FlavorForm;