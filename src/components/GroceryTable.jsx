import React from 'react';
import GroceryItems from './GroceryItems';

const GroceryTable = ({groceries, deleteGrocery, buyGrocery}) => {
    return (
      <div>
        <table className="table text-center table-hover mx-auto bg-white table-responsive-sm table-striped" style={{ marginLeft: 'auto', marginRight: 'auto', width: '40%' }}>
          <thead className="text-center text-white bg-info border border-white">
            <tr className="p-3">
              <th scope="col" className="border border-white">
                S/N
              </th>
              <th scope="col" className="border border-white">
                Grocery Name
              </th>
              <th scope="col" className="border border-white">
                Price
              </th>
              <th scope="col" className="border border-white"></th>
              <th scope="col" className="border border-white">
                
              </th>
            </tr>
          </thead>
          <tbody>
          {groceries.map(grocery =>
            <tr id="#1" className="border border-white text-left">
              <td className="border border-white">{grocery.id}</td>
              <td>{grocery.name}</td>
              <td>&#8358; {grocery.price}</td>
              <td>
                <button type="button" className="btn-warning btn-sm"
                onClick={() => buyGrocery(grocery.id)}>
                  Buy
                </button>
              </td>
              <td>
                <button type="button" className="btn-danger btn-sm"
                onClick={() => deleteGrocery(grocery.id)}>
                  Delete Product
                </button>
              </td>
            </tr>
          )}
          </tbody>
        </table>
      </div>
    );
  }

export default GroceryTable;
