import BuyButton from "./BuyButton"
import Product from "./product"
import "./StoreExpense.css"
import { useNavigate } from "react-router-dom";
import { useState} from "react";

function StoreExpense (props){
    const navigate = useNavigate();
    const [items, setItems] = useState(props.item||[])
    const applyFilters = () => {
        let minPrice = parseInt(document.getElementById("min").value);
        let maxPrice = parseInt(document.getElementById("max").value);
        if (isNaN(minPrice)||minPrice===""){
            minPrice=0
        }
        if (isNaN(maxPrice)||maxPrice===""){
            maxPrice=2147483647
        }
        if(minPrice<0||maxPrice<0){
            alert("well nothing here is in negative price, obviously")
        } else{
            if(minPrice<=maxPrice){
                setItems(props.item.filter(item => (item.price>=minPrice)&&(item.price<=maxPrice)))
            } else {
                alert("min price can't be higher then max price" )
            }
        }
    }
    return(
       <div>
        <button className="go-to-cart-button" onClick={() => navigate('/Cart')}>My cart</button>
        <br></br>
        <br></br>
        <span className ="filters">
            filter by price: min 
            <input type = "number" className="numberInputs" id="min"></input> 
            max 
            <input type = "number" className="numberInputs" id="max"></input>
            <button className="filter-submitter" onClick={applyFilters}>use filters</button>
            </span>
        <br></br>
        <br></br>
       
       
       {items.length === 0 ?(
        <div className ="unfortunate-message" >No items match the current filters 😢 </div>
        ):(
            <div className="itemTable">
                {items.map((itemI) => (
                    <span className="product-container">
                        <Product 
                        key = {itemI.id}
                        title = {itemI.title}
                        image = {itemI.image}
                        price = {itemI.price}/>          
                        <BuyButton item = {itemI} index = {itemI.id} />
                    </span>

                    ))} 
            </div>
        )}
       </div>
    )
}

export default StoreExpense