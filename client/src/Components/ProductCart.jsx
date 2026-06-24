import { Link } from "react-router-dom"
import "../styles/product.css"

const ProductCart = ({product}) =>{
    return (
        <div className="product-cart">
           <img src={product.imageUrl} alt="" />
           <div className="product-info">
            <h3 className="prodcut-name">{product.name}</h3>
            <p className="product-price" >{product.price}</p>
            <Link to={`/product/${product._id}`} className="view-details-button"> 
            View Details
            </Link>
           </div>
        </div>
    )
}

export default ProductCart;