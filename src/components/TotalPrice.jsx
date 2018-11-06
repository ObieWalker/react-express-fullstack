import React from 'react';

const TotalPrice = ({groceries}) => {
  let totalPrice = 0;
  groceries.map(grocery => {
    if (grocery.purchased){
      return totalPrice += grocery.price
    }
  })
  return (
      <div>
        <p>Total Price: &#8358; {totalPrice}</p>
      </div>
    );
  }

export default TotalPrice;
