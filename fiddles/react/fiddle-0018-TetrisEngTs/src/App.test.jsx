import { shallow } from 'enzyme'
import App from './App'

describe('App', () => {
  it('can render', () => {
    const app = shallow(<App />);
    expect(app).toMatchSnapshot();
  });

});