
import React from 'react';
import './EssayForm.css';

class EssayForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Please write an essay about your favorite DOM element.'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('An essay was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <h1>Essay Form</h1>
        <form onSubmit={this.handleSubmit}>
          <table>
            <tr>
              <td><label>
                Essay:

              </label></td>
              <td>
                <textarea value={this.state.value} onChange={this.handleChange} />
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

export default EssayForm;