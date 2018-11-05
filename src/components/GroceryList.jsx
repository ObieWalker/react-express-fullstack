import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addGrocery, deleteGrocery, buyGrocery } from '../actions/groceryAction'

import GroceryTable from './GroceryTable'

class GroceryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      groceryName: '',
      groceryPrice: '',
      errors: {}
    };
  
  this.handleHide = this.handleHide.bind(this);
  this.updateDetails = this.updateDetails.bind(this)
  this.addGrocery = this.addGrocery.bind(this)
  this.onDelete = this.onDelete.bind(this)
  this.onBuy = this.onBuy.bind(this)
}

handleHide() {
  this.setState({ show: false });
}

addGrocery(e) {
  e.preventDefault();
  const { groceryName, groceryPrice, errors } = this.state;
  if (groceryName !== '' && groceryPrice !== null ){
    const groceryDetails = {
      groceryName: this.state.groceryName,
      groceryPrice: this.state.groceryPrice
    }
    this.props.addGrocery(groceryDetails)
    this.setState({ show: false });
  } else {
    if (groceryName === ''){
      errors.groceryName = 'Please fill in the grocery name'
    } 
    if (groceryPrice === '' ){
      errors.groceryPrice = 'Please fill in the grocery price'
    }
    this.setState({ errors })
  }
}

updateDetails(e) {
  this.setState({
    [e.target.name]: e.target.value
  });
}



onDelete(id) {
  this.props.deleteGrocery(id)
}

onBuy(id) {
  this.props.buyGrocery(id)
}

  render() {
    const  { errors } = this.state
    return (
      <div>
        <h1>Grocery Listing  </h1>
        <GroceryTable groceries={this.props.groceries}
        addGrocery={this.addGrocery}
        deleteGrocery={this.onDelete}
        buyGrocery={this.onBuy}/>
        <button className="btn btn-lg btn-primary"
          onClick={() => this.setState({ show: true })} >Add Grocery</button>
        <Modal
          show={this.state.show}
          onHide={this.handleHide}
          container={this}
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
              id="groceryName"
              name="groceryName"
              required
              onChange={this.updateDetails}
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
              id="groceryPrice"
              name="groceryPrice"
              required
              onChange={this.updateDetails}
            />
            </Modal.Body>
            <Modal.Footer>
            <button
              type="submit"
              id="add-grocery"
              className="waves-effect waves-dark
              btn right hoverable dark-green btn btn-primary"
              onClick={this.addGrocery}
              >Add Item
            </button>
            </Modal.Footer>
          </Modal>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  groceries: state.groceries
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addGrocery,
      deleteGrocery,
      buyGrocery 
    },
    dispatch
  );


export default connect(mapStateToProps, mapDispatchToProps)(GroceryList);
