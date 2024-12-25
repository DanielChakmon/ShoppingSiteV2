import './product.css'
function product(props){
    return(
        <div className= 'product'>
            <img className='item_image' src={props.image} alt= 'not found'/>
            <div className= 'item_title'>
                {props.title}
            </div>
            <div className= 'item_price'>
                {props.price}$
            </div>
        </div>
    )
}

export default product