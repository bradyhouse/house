import React from 'react';
import './NameForm.css';

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
     <div>
       <h3>Single Field Form</h3>
       <div className="nameForm">
      <form onSubmit={this.handleSubmit}>
        <table>
          <tr>
            <td><label>
              Name:
              <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label></td>
          </tr>
          <tr>
            <td className="btmRow">
              <input type="submit" value="Submit" />
            </td>
          </tr>
        </table>
      </form>
      </div>
     </div>
    );
  }
}

export default NameForm;