import React from 'react';
import './ProductTable.css';

function DisplayProducts(props) {
    return (
        <div>
            {props.quotation.products ? 
            <table>
                <thead>
                    <tr>
                        <th>Model Number</th>
                        <th>Brand</th>
                        <th>Product Image</th>
                        <th>Description</th>
                        <th>Quantity</th>
                        <th>Unit Price</th>
                        <th>Total Price</th>
                        <th>Discount %</th>
                        <th>Tax</th>
                        <th>Tax value</th>
                        <th>Total</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {props.quotation.products.map(product => (
                        <tr key={product.productId}>
                            <td>{product.modelNumber}</td>
                            <td>{product.brand}</td>
                            <td>
                                <div className="productImage">
                                    <img src={product.imageURL} alt="Product"></img>
                                </div>
                            </td>
                            <td>{product.description}</td>
                            <td>{product.quantity}</td>
                            <td>{product.price}</td>
                            <td>{product.productPricing.productPrice}</td>
                            <td>{product.discount}</td>
                            <td>{product.tax}</td>
                            <td>{product.productPricing.taxValue}</td>
                            <td>{product.productPricing.totalPrice}</td>
                            <td><button onClick={() => {props.editTableProduct(product.productId)}}>Edit</button>
                            <button onClick={() => {props.deleteTableProduct(product.productId)}}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>  : <p>Start adding products</p> }
        </div>
    )
}

export default DisplayProducts
