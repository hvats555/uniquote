import React from 'react';
import './ProductTable.css';

function DisplayProducts(props) {
    return (
        <div>
            {props.quotation.products ? 
            <table>
                <thead>
                    <tr>
                        <th>Brand</th>
                        <th>Model Number</th>
                        <th>Description</th>
                        <th>Quantity</th>
                        <th>Unit Price</th>
                        <th>Total Price</th>
                        <th>Discount %</th>
                        <th>Tax</th>
                        <th>Tax value</th>
                        <th>Total</th>
                    </tr>
                </thead>

                <tbody>
                    {props.quotation.products.map(product => (
                        <tr key={product.productId}>
                            <td>{product.brand}</td>
                            <td>{product.modelNumber}</td>
                            <td>{product.description}</td>
                            <td>{product.quantity}</td>
                            <td>{product.price}</td>
                            <td>{product.productPricing.productPrice}</td>
                            <td>{product.discount}</td>
                            <td>{product.tax}</td>
                            <td>{product.productPricing.taxValue}</td>
                            <td>{product.productPricing.totalPrice}</td>
                        </tr>
                    ))}
                </tbody>
            </table>  : <p>Start adding products</p> }
        </div>
    )
}

export default DisplayProducts
