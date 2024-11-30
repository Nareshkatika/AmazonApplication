import { useDispatch,useSelector } from "react-redux"
import { RemoveCart,updateQuantity } from "./ReduxToolkit/slicedSolution"
import{Link} from 'react-router-dom'
import './style.css'


const Cart=()=>{
    const dispatch=useDispatch()
    const{AllItems,totalPrice}=useSelector((state)=>state.shopping)

    const RemoveItem=(item)=>{
        dispatch(RemoveCart(item))
    }


    const increaseElBtn=(id,item)=>{
        dispatch(updateQuantity({id,quantity:item+1}))
    }

    const decreaseElBtn=(id,item)=>{
        if(item>1){
            dispatch(updateQuantity({id,quantity:item-1}))
        }
    }

    return(
        <div>
           <ul>
            {AllItems.map(eachItem=>(

                <li className="cartArrangeEl" >
                    <img style={{height:'80px'}} alt={eachItem.title} src={eachItem.image}/>
                    <div>
                    <p>Price:{eachItem.price}</p>
                    <p>Ratings:{eachItem.rating}</p>
                    <button onClick={()=>increaseElBtn(eachItem.id,eachItem.quantity)} >+</button>
                <button>{eachItem.quantity}</button>
                <button onClick={()=>decreaseElBtn(eachItem.id,eachItem.quantity)} >-</button>
                    <button onClick={()=>RemoveItem(eachItem.id)} >RemoveItem</button>
                    </div>
                </li>
            ))}
           {AllItems.length>0 &&  <p>TotalPrice:{totalPrice}</p>  }
            {AllItems.length===0 && <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}} >
                <img style={{height:'300px'}} alt='cart' src='https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-img.png'/>
                <p>it's Empty Cart</p>
                <Link to='/' ><button>Go To Products</button></Link>
            </div> }
           </ul>
        </div>
    )
}

export default Cart