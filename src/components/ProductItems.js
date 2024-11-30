
import axios from 'axios'
import{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { AddCart } from './ReduxToolkit/slicedSolution'
import { Link } from 'react-router-dom'

import './style.css'


const ProductItems=()=>{
    const {id}=useParams()
    const[store,setStore]=useState([])
    const dispatch=useDispatch()
    const[similarItems,setSimilarItems]=useState([])
    const[loading,setLoading]=useState(true)

    const {AllItems}=useSelector((state)=>state.shopping)

    const AddToCartButton=(item)=>{
        dispatch(AddCart({...item,quantity:1}))
    }

    const added=AllItems.some(each=>each.id===store.id)

    

    useEffect(()=>{
        setSimilarItems([])
        const FetchData=async()=>{
            try{
                const response=await axios.get(`https://fakestoreapi.com/products/${id}`)
                const formattedData={
                    id:response.data.id,
                    title:response.data.title,
                    price:response.data.price,
                    rating:response.data.rating.rate,
                    category:response.data.category,
                    image:response.data.image
                }
                const similarProducts=await axios.get(`https://fakestoreapi.com/products?category=${response.data.category}`)
                
                const solution=similarProducts.data.filter(
                    (item) => item.id !== response.data.id && 
                              item.category.toLowerCase() === response.data.category.toLowerCase()
                );
                
                setSimilarItems(solution)
                setLoading(false)
                setStore(formattedData)

            }catch(error){
                console.log(error.message)
            }
        }
        FetchData()
        
    },[id])

    return (
        <div>
            {loading ? (
                <p>Loading... please wait</p>
            ) : (
                <div style={{ padding: '10px' }}>
                    <img alt={store.title} style={{ height: '100px' }} src={store.image} />
                    <p>{store.title}</p>
                    <p>Price: {store.price}</p>
                    <p>Rating: {store.rating}</p>
                    <p>Category: {store.category}</p>
                    <div>
                        {added ? (
                            <button>Added</button>
                        ) : (
                            <button onClick={() => AddToCartButton(store)}>Add</button>
                        )}
                    </div>
                    <div>
                        <h1>Similar Products</h1>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                                padding: '20px',
                            }}
                        >
                            {similarItems.slice(0, 4).map((eachItem) => (
                                <Link key={eachItem.id} to={`/products/${eachItem.id}`}>
                                    <div className="similarProducts">
                                        <img
                                            alt={eachItem.title}
                                            style={{ height: '180px', width: '180px' }}
                                            src={eachItem.image}
                                        />
                                        <p>Price: {eachItem.price}</p>
                                        <p>Rating: {eachItem.rating.rate}</p>
                                        <p>Category: {eachItem.category}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}    

    

        
    

export default ProductItems