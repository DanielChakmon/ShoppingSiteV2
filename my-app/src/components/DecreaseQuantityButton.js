import "./DecreaseQuantityButton.css"
import { ref, update, get } from 'firebase/database';
import database from './FireBaseDB.js';

function DecreaseQuantityButton(props){

    const decreaseQuantity = async() =>{
        try{
            const dbRefToItem = ref(database, 'my_cart/'+props.originalIndex)
            const snapshot = await get(dbRefToItem)
            if (snapshot.exists()) {
                const item = snapshot.val()
                let itemQuantity = item.quantity
                if (itemQuantity>0){
                    itemQuantity--
                
                update(dbRefToItem, {
                    quantity: itemQuantity
                }).then(() => {
                    props.onUpdateToDB()
                    return 
                }).catch((error) => {
                    console.error("error at decreasing quantity: ", error)
                })
                }
            } else {
                return 
            }
        } catch(error){
            console.error("error fetching items in cart: ",error)
            return 
        }
            
    }

    return(
        <div>
            <button className="decrease-quantity-button" onClick={decreaseQuantity}>Decrease Quantity</button>
        </div>
    )
}

export default DecreaseQuantityButton