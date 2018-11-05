import React from 'react';

const GroceryItems = ({groceryItem}) => {
    return (
      <div>
        <tr id="#1" className="border border-white">
          <td className="border border-white">{groceryItem.id}</td>
          <td>{groceryItem.name}</td>
          <td>
            <button type="button" className="btn-warning btn-sm">
              Buy
            </button>
          </td>
          <td>
            <button type="button" className="btn-danger btn-sm">
              Delete Product
            </button>
          </td>
        </tr>
      </div>
    );
  }

export default GroceryItems;
