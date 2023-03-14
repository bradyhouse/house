
import { shallow } from 'enzyme'
import Ctrl from './Ctrl'

describe('Ctrl', () => {
  it('can render', () => {
    let value = ''
    const ctrl = shallow(<Ctrl onClick={() => {}} isDisabled={true} setValue={(val) => {value = val}} />);
    expect(ctrl).toMatchSnapshot();
  });

});