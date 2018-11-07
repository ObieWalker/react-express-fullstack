import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';
import { loadGroceries, addGrocery, deleteGrocery, buyGrocery, editGrocery} from '../../actions/groceryAction';
import * as types from '../../actions/actionTypes';
import groceries from '../__mocks__/groceriesData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('fetch groceries actions', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it('handles GET_GROCERIES_SUCCESS after get groceries', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: groceries
      });
    });
    const expectedActions = [
      { type: types.GET_GROCERIES_SUCCESS, groceries }
    ];
    const store = mockStore({groceries: []});
    return store.dispatch(loadGroceries()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('add groceries actions', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it('handles ADD_GROCERY_SUCCESS after adding grocery', () => {
    const grocery = groceries[0]
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: {
          grocery
        }
      });
    });
    const expectedActions = [
      { type: types.ADD_GROCERY_SUCCESS, grocery }
    ];
    const store = mockStore({grocery: {}});
    return store.dispatch(addGrocery(grocery)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('delete groceries actions', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it('handles DELETE_GROCERY_SUCCESS after deleting grocery', () => {
    const groceryId = 3
    const message = "Grocery has been deleted"
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          message
        }
      });
    });
    const expectedActions = [
      { type: types.DELETE_GROCERY_SUCCESS, groceryId }
    ];
    const store = mockStore({grocery: {}});
    return store.dispatch(deleteGrocery(groceryId)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('buy groceries actions', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it('handles BUY_GROCERY_SUCCESS after buying grocery', () => {
    const groceryId = 3
    const message = "Grocery has been successfully purchased"
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          message
        }
      });
    });
    const expectedActions = [
      { type: types.BUY_GROCERY_SUCCESS, groceryId }
    ];
    const store = mockStore({grocery: {}});
    return store.dispatch(buyGrocery(groceryId)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('edit groceries actions', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it('handles EDIT_GROCERY_SUCCESS after buying grocery', () => {
    const groceryId = 3
    const message = "Grocery has been successfully modified"
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          message
        }
      });
    });
    const expectedActions = [
      { type: types.EDIT_GROCERY_SUCCESS, groceryId }
    ];
    const store = mockStore({grocery: {}});
    return store.dispatch(editGrocery(groceryId)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});