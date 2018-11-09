import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Loading from 'react-loading-animation';
import toastr from 'toastr';
import { loadGroceries, addGrocery, deleteGrocery, buyGrocery, editGrocery, clearCart } from '../actions/groceryAction'
import GroceryModal from './GroceryModal';
import TotalPrice from './TotalPrice';

import GroceryTable from './GroceryTable'

export class GroceryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      showEdit: false,
      groceryName: '',
      groceryPrice: '',
      errors: {},
      grocery: {},
      cartEmpty: true,
      loading: false
    };
  
  this.handleHide = this.handleHide.bind(this);
  this.updateDetails = this.updateDetails.bind(this)
  this.addGrocery = this.addGrocery.bind(this)
  this.editGrocery = this.editGrocery.bind(this)
  this.onDelete = this.onDelete.bind(this)
  this.onBuy = this.onBuy.bind(this)
  this.handleShowEdit = this.handleShowEdit.bind(this)
  this.clearCart = this.clearCart.bind(this)
  }

  componentWillMount() {
    this.setState({ loading: true })
    this.props.loadGroceries().then(() => {
      this.setState({ loading: false })
      this.props.groceries.map(grocery => {
          if (grocery.purchased === true) {
            this.setState({
              cartEmpty: false
            })
          }
        })
    })
  }

  componentWillReceiveProps(nextProps) {
    let emptyCart = true;
    this.props.groceries.map(grocery => {
      if (grocery.purchased === true) {
        emptyCart = false
        return emptyCart
      }
    })
    this.setState({ cartEmpty: emptyCart })
  }

handleHide() {
  this.setState({
    groceryName: '',
    groceryPrice: '', 
    show: false });
}

handleShowEdit(grocery) {
  this.setState({
    groceryName: grocery.name,
    groceryPrice: grocery.price,
    show: true,
    grocery
  })
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
    this.setState({
      show: false,       
      groceryName: '',
      groceryPrice: '',
      errors: {} 
    });
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

editGrocery(grocery) {
  const { groceryName, groceryPrice, errors } = this.state;
  if (groceryName !== '' && groceryPrice !== null ){
    const groceryDetails = {
      groceryName: this.state.groceryName,
      groceryPrice: this.state.groceryPrice
    }
    this.props.editGrocery(grocery._id, groceryDetails)
    this.setState({
      show: false,       
      groceryName: '',
      groceryPrice: '',
      errors: {} 
    });
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

onBuy(id, purchased) {
  this.props.buyGrocery(id, purchased)
  this.setState({cartEmpty: false})
}

clearCart() {
  const { cartIsEmpty } = this.state
  if (!cartIsEmpty){
      this.props.clearCart()
      this.setState({ cartEmpty: true})
  } else {
    toastr.error("Cart is already empty.")
  }
}

  render() {
    const  { errors } = this.state
    return (
      <div>
        <h1 className="text-center">Grocery Listing  </h1>

        { this.state.loading ? 
          <Loading /> : 
          <GroceryTable 
            groceries={this.props.groceries}
            addGrocery={this.addGrocery}
            deleteGrocery={this.onDelete}
            buyGrocery={this.onBuy}
            onShow={this.handleShowEdit}
          />
        }

        <GroceryModal 
          errors={errors}
          addGrocery={this.addGrocery}
          editGrocery={this.editGrocery}
          updateDetails={this.updateDetails}
          onHide={this.handleHide}
          show={this.state.show}
          groceryName={this.state.groceryName}
          groceryPrice={this.state.groceryPrice}
          grocery={this.state.grocery}
        />
        <div className="text-center">
          <button className="btn btn-lg btn-primary "
            onClick={() => this.setState({ show: true })} >
            Add Grocery
          </button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <input
            type="submit"
            value='Clear Cart'
            disabled={this.state.cartEmpty}
            className='btn btn-lg btn-danger'
            onClick={this.clearCart}
            />
        </div>
        <div className="p-3 mb-2 bg-info text-white" style={{ float: 'right', padding: '2%' }}>
          <h4>
            <TotalPrice groceries={this.props.groceries}/>
          </h4>
        </div>
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
      loadGroceries,
      addGrocery,
      deleteGrocery,
      buyGrocery,
      editGrocery,
      clearCart
    },
    dispatch
  );


export default connect(mapStateToProps, mapDispatchToProps)(GroceryPage);
