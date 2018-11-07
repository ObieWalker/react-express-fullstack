import React from 'react';
import ReactDOM from 'react-dom';
import expect from 'expect';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import connect, {GroceryList} from '../../components/GroceryList';

const mockStore = configureStore();
let mounted;
let props;
let wrapper;
let id = 'dfsddsd'
let grocery = {
  id: 'adsfadsfads',
  name : 'randomName',
  price : 'randomPrice'
}
const errors = {
  groceryName : '',
  groceryPrice: ''
}

const onShow = true;
const addGrocery = jest.fn(() => Promise.resolve({}));
const buyGrocery = jest.fn(() => Promise.resolve({}));
const deleteGrocery = jest.fn(() => Promise.resolve({}));
const editGrocery = jest.fn(() => Promise.resolve({}));
const  groceries = [{}]

const getComponent = () => {
  if (!mounted) {
    props = {
      groceries,
      addGrocery,
      deleteGrocery,
      editGrocery,
      buyGrocery,
      onShow
    };
    mounted = shallow(<GroceryList {...props} />);
  }
  return mounted;
};

describe('GroceryList Component', () => {
  beforeEach(() => {});
  wrapper = getComponent();

  it('renders component successfully', () => {
    wrapper = getComponent();
    expect(wrapper).toMatchSnapshot();
  });

  describe('Check functions are called', () => {
    it('should have a method handleHide', () => {
      expect(wrapper.instance().handleHide).toBeDefined();
    });
    it('should have a method that updateDetails', () => {
      expect(wrapper.instance().updateDetails).toBeDefined();
    });
    it('should have a method that addGrocery', () => {
      expect(wrapper.instance().addGrocery).toBeDefined();
    });
    it('should have a method that editGrocery', () => {
      expect(wrapper.instance().editGrocery).toBeDefined();
    });
    it('should have a method that onDelete', () => {
      expect(wrapper.instance().onDelete).toBeDefined();
    });
    it('should have a method that onBuy', () => {
      expect(wrapper.instance().onBuy).toBeDefined();
    });
    it('should have a method that handleShowEdit', () => {
      expect(wrapper.instance().handleShowEdit).toBeDefined();
    });
  })

  describe('Checks state change', () => {
    it('should have a method handleHide', () => {
      wrapper = getComponent();
      wrapper.instance().handleHide();
      expect(wrapper.state().show).toEqual(false);
      expect(wrapper.state().groceryName).toEqual('');
      expect(wrapper.state().groceryPrice).toEqual('');
    });
    it('should have a method handleShowEdit', () => {
      wrapper = getComponent();
      wrapper.instance().handleShowEdit(grocery);
      expect(wrapper.state().show).toEqual(true);
      expect(wrapper.state().groceryName).toEqual('randomName');
      expect(wrapper.state().groceryPrice).toEqual('randomPrice');
    });
    it('should have a method addGrocery', () => {
      wrapper = getComponent();
      const e = { preventDefault: () => undefined };
      e.preventDefault = jest.fn();
      wrapper.instance().addGrocery(e);
      expect(e.preventDefault).toHaveBeenCalled();
      expect(wrapper.state().groceryName).toEqual('');
      expect(wrapper.state().groceryPrice).toEqual('');
    });
    it('should have a method addGrocery', () => {
      grocery = {
        name : '',
        price : ''
      }
      wrapper = getComponent();
      const e = { preventDefault: () => undefined };
      e.preventDefault = jest.fn();
      wrapper.instance().addGrocery(e);
      expect(e.preventDefault).toHaveBeenCalled();
      expect(wrapper.state().groceryName).toEqual('');
      expect(wrapper.state().groceryPrice).toEqual('');
    });
    it('should have a method editGrocery', () => {
      wrapper = getComponent();
      wrapper.instance().editGrocery(grocery);
      expect(wrapper.state().groceryName).toEqual('');
      expect(wrapper.state().groceryPrice).toEqual('');
    });
    it('should have a method editGrocery', () => {
      grocery = {
        name : '',
        price : ''
      }
      wrapper = getComponent();
      wrapper.instance().editGrocery(grocery);
      expect(wrapper.state().groceryName).toEqual('');
      expect(wrapper.state().groceryPrice).toEqual('');
    });
    it('should have a method onDelete', () => {
      wrapper = getComponent();
      wrapper.instance().onDelete(id);
    });
    it('should have a method onBuy', () => {
      wrapper = getComponent();
      wrapper.instance().onBuy(id);
    });
    it('should click on Add Grocery button', () => {
      wrapper = getComponent();
      wrapper
      .find('.btn')
      .simulate('click');
    });
  })
});

describe('Connected Component', () => {
    describe('Connected mounted', () => {
      it('component successfully rendered', () => {
        const store = mockStore({
          addGrocery,
          deleteGrocery,
          buyGrocery,
          editGrocery,
          groceries
        });
        wrapper = shallow(<connect
          store={store}
          addGrocery={addGrocery}
          deleteGrocery={deleteGrocery}
          buyGrocery={buyGrocery}
          editGrocery={editGrocery}
          groceries={groceries}
        />);
        expect(wrapper.length).toBe(1);
      });
    });
  });
