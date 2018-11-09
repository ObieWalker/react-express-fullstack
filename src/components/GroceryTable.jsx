import React from 'react';

const GroceryTable = ({groceries, deleteGrocery, buyGrocery, onShow}) => {
    return (
      <div>
        {groceries &&  groceries.length > 0 ? 
          <table className="table text-center table-hover mx-auto bg-white table-responsive-sm table-striped" style={{ marginLeft: '25%', marginRight: '10%', width: '50%' }}>
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
              <th scope="col" className="border border-white"></th>
              <th scope="col" className="border border-white"></th>
            </tr>
          </thead>
          <tbody>
          {groceries.map((grocery, i) =>
            <tr id="#1"
              key={i}
              index={i}
              className="border border-white text-left">
              <td className="border border-white">{i + 1}</td>
              <td>{grocery.name}</td>
              <td>&#8358; {grocery.price}</td>
              <td>
                <input
                type="submit"
                value={grocery.purchased ? 'Remove' : 'Purchase'}
                className={grocery.purchased ? 'btn btn-warning' : 'btn btn-primary'}
                onClick={() => buyGrocery(grocery._id, grocery.purchased)}
                />
              </td>
              <td>
                <button type="button" className="btn-warning btn-sm"
                onClick={() => onShow(grocery)}
                >
                  Edit Product
                </button>
              </td>
              <td>
                <button type="button" className="btn-danger btn-sm"
                onClick={() => deleteGrocery(grocery._id)}>
                  Delete Product
                </button>
              </td>
            </tr>
          )}
          </tbody>
        </table>
        : 
        <div>
        <h3 className="text-center ">No groceries Available at this time. Try reloading or add some.</h3>
        <br />
        </div>
        }
      </div>
    );
  }

export default GroceryTable;
