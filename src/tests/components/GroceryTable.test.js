import React from 'react';
import ReactDOM from 'react-dom';
import expect from 'expect';
import { shallow } from 'enzyme';
import GroceryTable from '../../components/GroceryTable';

let mounted;
let props;
let wrapper;
const groceryName = ''
const groceryPrice = ''
const errors = {
  groceryName : '',
  groceryPrice: ''
}

const onShow = true;
const buyGrocery = jest.fn(() => Promise.resolve({}));
const deleteGrocery = jest.fn(() => Promise.resolve({}));
const  groceries = [{}]

const getComponent = () => {
  if (!mounted) {
    props = {
      groceries,
      deleteGrocery,
      buyGrocery,
      onShow
    };
    mounted = shallow(<GroceryTable {...props} />);
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

