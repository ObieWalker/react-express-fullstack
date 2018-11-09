import React from 'react';

const TotalPrice = ({groceries}) => {
  let totalPrice = 0;
  let priceAppended
  groceries.map(grocery => {
    if (grocery.purchased){
      totalPrice += grocery.price
    }
    priceAppended = totalPrice.toFixed(2)
    return priceAppended
  })
  return (
      <div>
        <p>Total Price: &#8358; {priceAppended}</p>
      </div>
    );
  }

export default TotalPrice;
