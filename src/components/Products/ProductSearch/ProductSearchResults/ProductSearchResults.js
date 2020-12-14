import React from 'react'
import './ProductSearchResults.css';

function ProductSearchResults(props) {
    return (
        <div className="productSearchResults__container">
            <span>Search results</span>
            {props.results.map(result => (
                <div className="productSearchResults__result" key={result.productId} onClick={event => props.searchListClickHandler(result)}>
                    <p>{result.modelNumber}</p>
                    <p>{result.description}</p>
                </div>
            ))} 
        </div>
    )
}

export default ProductSearchResults
