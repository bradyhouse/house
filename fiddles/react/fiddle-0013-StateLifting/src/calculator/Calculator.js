import React, { Component } from 'react';
import './Calculator.css';
import TemperatureInput from './temperature-input/TemperatureInput';

function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <h2 className="red">Boiling</h2>;
  }
  if (props.celsius <= 50) {
    return <h2 className="blue">Cold</h2>;
  }

  if (props.celsius >= 32) {
    return <h2 className="pink">Warm</h2>;
  }

  return <h3>Unknown</h3>;
}

function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}


class Calculator extends Component {

  constructor(props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = {temperature: '', scale: 'c'};
  }

  handleCelsiusChange(temperature) {
    this.setState({scale: 'c', temperature});
  }

  handleFahrenheitChange(temperature) {
    this.setState({scale: 'f', temperature});
  }


  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;
    return (
      <div className="calculator">
        <h1>Boiling Point Calculator</h1>
        <table>
          <tr>
            <td>
              <TemperatureInput
                scale="c"
                temperature={celsius}
                onTemperatureChange={this.handleCelsiusChange} />

            </td>
            <td>
              <TemperatureInput
                scale="f"
                temperature={fahrenheit}
                onTemperatureChange={this.handleFahrenheitChange} />
            </td>
          </tr>
          <tr>
            <td colSpan="2">
              <BoilingVerdict
                celsius={parseFloat(celsius)} />
            </td>
          </tr>
        </table>
      </div>
    );
  }
}

export default Calculator;