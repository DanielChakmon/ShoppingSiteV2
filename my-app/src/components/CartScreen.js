import database from "./FireBaseDB"
import { ref, get } from 'firebase/database';
import { useState, useEffect } from "react";
import DecreaseQuantityButton from "./DecreaseQuantityButton";
import Product from "./product";
import "./CartScreen.css"
import { useNavigate } from "react-router-dom";

function CartScreen (props){
    const navigate = useNavigate();
    const [cartExpense, setCartExpense] = useState([])
    const [cartUpdated, setCartUpdated] = useState(false);
    const [totalPrice, setTotalPrice] = useState(["0$"])

    useEffect(() => {
        const fetchCartItems = async() => {
          try{
            const dbRef = ref(database, 'my_cart')
            const snapshot = await get(dbRef)
            
            if (snapshot.exists()) {
                const data = snapshot.val()
                let cartExpense = Object.values(data)
                cartExpense = cartExpense.filter(item => item.quantity > 0).sort((itemA, itemB) => itemA.date - itemB.date)
                setCartExpense(cartExpense)
                setTotalPrice(`${cartExpense.reduce((acc,curr)=>acc+curr.price*curr.quantity,0)}$`)
            }
          } catch(error){
            console.error("error fetching items in cart: ",error)
          }
        }
    
        fetchCartItems()
        setCartUpdated(false);
      },[cartUpdated])

      const handleUpdateToDB = () => {
        setCartUpdated(true); 
      }
      
    return(
        <div>
            <button className = "go-to-store-button" onClick={() => navigate('/')}>Continue browsing</button>
            <br></br>
            <br></br>
            <h1>My cart: </h1>
            <br></br>
            <h2>Total price: {totalPrice}</h2>
            <br></br>
            <button className = "buy-now-button">Buy now!</button>
            <br></br>
            <h2>Items: </h2>
            <br></br>

                {cartExpense.length === 0?(
                    <div className="no-items-message">
                        Wow so empty! you should add items to your cart to see them here
                    </div>
                ):(
                <div>
                {cartExpense.map((itemI,index) => (
                    <div className="cart-item">
                        <span className="quantity-holder">{itemI.quantity} x</span>
                        <span className="product-container-in-cart">
                            <Product
                            key = {index}
                            title = {itemI.title}
                            image = {itemI.image}
                            price = {itemI.price}/>
                            <DecreaseQuantityButton onUpdateToDB={handleUpdateToDB} item = {itemI} originalIndex = {itemI.key}/>
                        </span>
                    </div>
                
                ))} 
            </div>
            )}
        </div>
    )
}

export default CartScreen