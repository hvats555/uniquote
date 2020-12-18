 import React from 'react'
import './ProductSearchResults.css';
import Paper from '@material-ui/core/Paper';


function ProductSearchResults(props) {
    return (
        <Paper elevation={2} className="productSearchResults__container">
            {props.results.map(result => (
                <div className="productSearchResults__result" key={result.productId} onClick={event => props.searchListClickHandler(result)}>
                    <span className="productSearchResults__meta">Model Number:</span>
                    <p className="productSearchResults__heading">{result.modelNumber}</p>
                    
                    <span className="productSearchResults__meta">Desctiption</span>
                    <p className="productSearchResults__content">{result.description}</p>
                </div>
            ))} 
        </Paper>
    )
}

export default ProductSearchResults
