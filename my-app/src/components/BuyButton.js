import "./BuyButton.css"
import database from './FireBaseDB.js';
import { ref, set, update, get } from 'firebase/database';

function BuyButton(props){
    
    const increamentQuantityIfExists = async() =>{
        try{
            const dbRefToItem = ref(database, 'my_cart/'+props.index)
            const snapshot = await get(dbRefToItem)
            if (snapshot.exists()) {
                const item = snapshot.val()
                let itemQuantity = item.quantity
                itemQuantity++
                update(dbRefToItem, {
                    quantity: itemQuantity
                }).then(() => {
                    return true
                }).catch((error) => {
                    console.error("error at increasing quantity: ", error)
                })
                if (itemQuantity===1){
                    update(dbRefToItem, {
                        date: Date.now()
                    }).then(() => {
                        return true
                    }).catch((error) => {
                        console.error("error at changing date: ", error)
                    })
                }
            } else {
                return false
            }
        } catch(error){
            console.error("error fetching items in cart: ",error)
            return false
        }
            
    }

    const addToCart = async() => {
        let alredyExist = await increamentQuantityIfExists()
        if (!alredyExist&&alredyExist !== undefined) {
            let dataToUpload = {
                quantity: 1,
                key: props.index,
                title: props.item.title,
                image: props.item.image,
                price: props.item.price,
                date: Date.now()
            }
            set(ref(database,'my_cart/'+props.index),dataToUpload)
                .then(() =>{
                })
                .catch((error)=>{
                    console.error("Error adding to cart: ",error)
                })
    
        }
    }
    return(
        <div>
            <button className="add-to-cart-button" onClick={addToCart}>Add to cart</button>
        </div>
    )
}

export default BuyButton