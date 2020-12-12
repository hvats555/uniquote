import React from 'react'
import './QuotationTemplate.css';

function QuotationTemplate(props) {
  return (
    <div class="quotation-box">
        {props.quotation.products ?
        <div>

            <div class="quotation-section">
            <div class="company-logo"></div>
            <div class="company-address">
                <p class="italics">Office Address</p>
                <p><span class="bold">Unifrost Food service Equipment</span><br />
                Ground Floor, 241/2, Opp. Metro Pillar 48, MG road<br/>
                Sultanpur, New Delhi - 110030</p>
            </div>
            </div>

            <hr />

            <div class="quotation-section">
                <p>Quotation ref : #32</p>
                <p>Date : 26 November 2020</p>
            </div>

            <div>
                <p class="bold">Customer Details</p>
                <snap>{props.name}</snap><br />
                <span>{props.address}</span><br />
                <span>+91 {props.phone}</span><br />
                <span>{props.email}</span>
            </div>

            <hr />
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
                        {props.quotation.products.map(p => (
                            <tr key={p.productId}>
                                <td>{p.brand}</td>
                                <td>{p.modelNumber}</td>
                                <td>{p.description}</td>
                                <td>{p.quantity}</td>
                                <td>{p.price}</td>
                                <td>{p.price * p.quantity}</td>
                                <td>{p.discount}</td>
                                <td>18</td>
                                <td>{(18/100)*(p.price * p.quantity) }</td>
                                <td>{p.totalProductPrice}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            <div class="quotation-summary">
                <p class="bold italics">Grand Total : {props.grandTotal}</p>
            </div>

            <p class="italics">Total (In words) : Will be solved later</p>

            <hr />

            <div class="quotation-section">
                <div class="font-14 italics">
                    <p>
                    <span class="bold">Terms and Conditions</span><br />
                    Payment : 100% Before Delivery <br />
                    Fright : Actual <br />
                    Warantty : 1 Year Comprihensive <br />
                    Delivery Schedule : After payment</p>
                </div>

                <div class="font-14 italics">
                    <p>
                    <span class="bold">Bank Details</span><br />
                    Company Name : Unifrost Food Service Equipment <br />
                    Bank Name : Corpration Bank <br />
                    Account Number : 560101000124208<br />
                    IFSC code : CORP0001760100 <br />
                    Branch Name : Branch-Ghitorni, New Delhi-30
                </p>
                </div>
            </div>

            
            <footer>
                <ul>
                    <li>+91 9873255539</li>
                    <li>sales@unifrostindia.com</li>
                    <li>www.unifrostindia.com</li>
                </ul>
            </footer> 
            </div> : <p>Make quotation to see the final result</p> }
      </div>
  )
}

export default QuotationTemplate
