import {useState, useEffect} from 'react';
import db from '../../firebase';

function AllProducts() {
    const [product, setProduct] = useState([]);
    useEffect(() => {
        db.collection('products').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
          setProduct(snapshot.docs.map(doc => ({id: doc.id, modelNumber: doc.data().modelNumber, description: doc.data().description, price: doc.data().price})))
        })
      }, []);

    return (
        <div>
            <h2>All products</h2>

            {product.map(p => (
            <div>
            <h3>{p.modelNumber}</h3>
            
            <p>{p.description}</p>
            <p>{p.price}</p>
            </div>
            ))} 
        </div>
    )
}

export default AllProducts
