import React, { Component } from 'react';

const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

class TemperatureInput extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};
  }

  handleChange(e) {
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <div>
        <fieldset>
          <legend><h2>{scaleNames[scale]}</h2></legend>
          <input value={temperature}
                 onChange={this.handleChange} />
        </fieldset>
      </div>
    );
  }

}

export default TemperatureInput;
