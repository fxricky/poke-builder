import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

import {PokeBuilder} from './PokeBuilder';
import PokeControls from '../../component/Poke/PokeControls/PokeControls'

configure({adapter: new Adapter()});

describe('PokeBuilder', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<PokeBuilder/>);
  })

  it('should render controls when ingredients are ready', () =>{ 
    wrapper.setProps({ingredients: {salad: 0}});
    expect(wrapper.find(PokeControls)).toHaveLength(1);
  });
})