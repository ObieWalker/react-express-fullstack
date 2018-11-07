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
        response: {
          groceries
        }
      });
    });
    const expectedActions = [
      { type: types.GET_GROCERIES_SUCCESS, groceries }
    ];
    const store = mockStore({groceries: {}} );
    return store.dispatch(loadGroceries()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  // it('handles FETCH_CENTERS_FAILURE after fetching centers', () => {
  //   const error = 'No centers available';
  //   moxios.wait(() => {
  //     const request = moxios.requests.mostRecent();
  //     request.respondWith({
  //       status: 404,
  //       response: {
  //         message: 'No centers available'
  //       }
  //     });
  //   });
  //   const expectedActions = [
  //     { type: types.IS_CENTERS_FETCHING, bool: true },
  //     { type: types.FETCH_CENTERS_FAILURE, error },
  //     { type: types.IS_CENTERS_FETCHING, bool: false }
  //   ];
  //   const store = mockStore({ centers: [] });
  //   return store.dispatch(getCenters()).then(() => {
  //     expect(store.getActions()).toEqual(expectedActions);
  //   });
  // });
  // it('handles CLEAR_CENTER_STATE to remove all centers', () => {
  //   const empty = [];
  //   const expectedActions = [{ type: types.CLEAR_CENTER_STATE, empty }];
  //   const store = mockStore({ centers: [] });
  //   store.dispatch(clearCenterState());
  //   expect(store.getActions()).toEqual(expectedActions);
  // });
});