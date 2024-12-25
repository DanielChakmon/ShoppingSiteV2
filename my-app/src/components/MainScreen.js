import {useEffect, useState} from 'react';
import StoreExpense from './StoreExpense';
import "./MainScreen.css"



function App() {
  const [products, setProducts] = useState([])
  useEffect(() => {
    const fetchProducts = async() => {
      try{
        const response = await fetch('https://fakestoreapi.in/api/products')
        const data = await response.json()
        const formatProducts = data.products.map((product,index) => ({
          title: product.title,
          image: product.image,
          price: product.price,
          id: index
        }))
        setProducts(formatProducts)
      } catch(error){
        console.error(error)
      }
    }
    fetchProducts()
  },[])
 
  return (
    <div>
      {products.length!==0?
      <StoreExpense item= {products}/>
    :<div className = "loading-message">loading...</div>  
    }
    </div>
  );
}

export default App;
