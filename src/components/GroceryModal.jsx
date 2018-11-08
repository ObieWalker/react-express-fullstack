import React from 'react';
import { Modal } from 'react-bootstrap'

const GroceryModal = ({errors, addGrocery, editGrocery, updateDetails, show, onHide, groceryName, groceryPrice, grocery}) => {
  return (
    <div>
      <Modal
          show={show}
          onHide={onHide}
          aria-labelledby="contained-modal-title"
          >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">Grocery Details
            </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ width: '100%', marginLeft: 'auto', marginRight: 'auto'}}>
            <label htmlFor="name" className="active">
              Grocery Name:
            </label>
            {errors.groceryName && (
              <span className="alert-danger"><br />
                {errors.groceryName}
              </span>
            )}
            <input
              type="text"
              className="form-control"
              defaultValue={groceryName || ''}
              id="groceryName"
              name="groceryName"
              required
              onChange={updateDetails}
            />
            <br />
            <label htmlFor="name" className="active">
              Grocery Price (&#8358;):
            </label>
            {errors.groceryPrice && (
              <span className="alert-danger"><br />
                {errors.groceryPrice}
              </span>
            )}
            <input
              type="number"
              className="form-control"
              defaultValue={groceryPrice || ''}
              id="groceryPrice"
              name="groceryPrice"
              required
              onChange={updateDetails}
            />
            </Modal.Body>
            <Modal.Footer>
            {grocery.id ? 
              <button
              type="submit"
              id="add-grocery"
              className="waves-effect waves-dark
              btn right hoverable dark-green btn btn-primary"
              onClick={() => editGrocery(grocery)}
              >Edit Item
            </button>
            : <button
              type="submit"
              id="add-grocery"
              className="waves-effect waves-dark
              btn right hoverable dark-green btn btn-primary"
              onClick={addGrocery}
              >Add Item
            </button>}
            
            </Modal.Footer>
          </Modal>
    </div>
  );
}

export default GroceryModal;
