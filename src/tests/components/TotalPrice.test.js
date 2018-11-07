import React from 'react';
import ReactDOM from 'react-dom';
import expect from 'expect';
import { shallow } from 'enzyme';
import TotalPrice from '../../components/TotalPrice';

let mounted;
let props;
let wrapper;

const getComponent = () => {
  if (!mounted) {
    props = {
      groceries: [{
        purchased: true
      }]
    };
    mounted = shallow(<TotalPrice {...props} />);
  }
  return mounted;
};

describe('TotalPrice Component', () => {
  beforeEach(() => {});

  it('renders component successfully', () => {
    wrapper = getComponent();
    expect(wrapper).toMatchSnapshot();
  });

});

