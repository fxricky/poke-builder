import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import {NavItems, NavItem} from './Toolbar'

configure({adapter: new Adapter()});

describe('Toolbar', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<NavItems/>);
  })

  it('should always render', () =>{ 
    expect(wrapper.find(NavItem)).toHaveLength(3);
  });

  it('should always have login', () =>{ 
    expect(wrapper.contains(<NavItem link='/auth' >Login</NavItem>)).toEqual(true);
  });
})