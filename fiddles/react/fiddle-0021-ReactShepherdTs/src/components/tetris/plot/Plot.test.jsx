
import React from 'react'
import { shallow } from 'enzyme'
import Plot from './Plot'

describe('Plot', () => {
  it('can be rendered', () => {
    let ctxVal = ''
    const plot = shallow(<Plot height={100} setContextFn={(ctx) => {ctxVal = ctx}} />);
    expect(plot).toMatchSnapshot();
  });

});