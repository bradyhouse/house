import { shallow } from 'enzyme'
import Tetris from './Tetris'

describe('Tetris', () => {
  it('can render', () => {
    const tetris = shallow(<Tetris height={200} />);
    expect(tetris).toMatchSnapshot();
  });

});