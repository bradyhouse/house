import _ from 'lodash';
import './styles.css';
import imageA from './a.png';
import Data from './data.xml';

function component() {
    const element = document.createElement('div');
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.classList.add('hello');
    const img = new Image();
    img.src = imageA;
    element.appendChild(img);
    console.log(Data);
    return element;
  }
  
  document.body.appendChild(component());