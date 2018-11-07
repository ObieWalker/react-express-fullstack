import React from 'react';
import ReactDOM from 'react-dom';
import expect from 'expect';
import { shallow } from 'enzyme';
import GroceryModal from '../../components/GroceryModal';

let mounted;
let props;
let wrapper;
const groceryName = ''
const groceryPrice = ''
const errors = {
  groceryName : '',
  groceryPrice: ''
}
const addGrocery = jest.fn();
const editGrocery = jest.fn();
const updateDetails = jest.fn();
const show = true
const onHide = jest.fn();
const  grocery = {}

const getComponent = () => {
  if (!mounted) {
    props = {
      errors,
      addGrocery,
      editGrocery,
      updateDetails,
      show,
      onHide,
      groceryName,
      groceryPrice,
      grocery
    };
    mounted = shallow(<GroceryModal {...props} />);
  }
  return mounted;
};

describe('GroceryModal Component', () => {
  beforeEach(() => {});

  it('renders component successfully', () => {
    wrapper = getComponent();
    expect(wrapper).toMatchSnapshot();
  });

});

