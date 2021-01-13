 import React from 'react'
import './ProductSearchResults.css';
import Paper from '@material-ui/core/Paper';


function ProductSearchResults(props) {
    const descriptionLength = 100;
    return (
        <Paper elevation={2} className="productSearchResults__container">
            {props.results.map(result => (
                <div className="productSearchResults__result" key={result.productId} onClick={event => props.searchListClickHandler(result)}>
                    <p className="productSearchResults__heading">{result.modelNumber}</p>    
                    <p className="productSearchResults__content">₹{result.price}</p>                
                    <p className="productSearchResults__content">
                    {
                        result.description.length > descriptionLength ?
                        result.description.substring(0, descriptionLength) + '...' : result.description
                    }
                    </p>
                </div>
            ))} 
        </Paper>
    )
}

export default ProductSearchResults
