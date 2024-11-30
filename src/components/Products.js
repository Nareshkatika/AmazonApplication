import { useState,useEffect } from "react";
import axios from 'axios'
import {Link} from 'react-router-dom'
import './style.css'
import Filters from "./Filters";


const Products=()=>{
    const[store,setStore]=useState(JSON.parse(localStorage.getItem('store'))|| [])
    const[items,setItems]=useState([])
    const[loading,setLoading]=useState(true)

    useEffect(()=>{
        if(store.length===0){
            const FetchData=async()=>{
                try{
                    const response=await axios.get('https://fakestoreapi.com/products')
                    setStore(response.data)
                    setItems(response.data)
                    setLoading(false)
    
                }catch(error){
                    console.log(error.message)
                }
            }
            FetchData()
        }
    },[])





    const[ratings,setRatings]=useState( JSON.parse(localStorage.getItem('ratings'))|| '')
    const[sortings,setSortings]=useState(JSON.parse(localStorage.getItem('sortings'))|| '')
    const[search,setSearch]=useState( JSON.parse(localStorage.getItem('search'))|| '')
    const[categories,setCategories]=useState(JSON.parse(localStorage.getItem('categories'))|| [])

    const searchFunction=()=>{
        const sol=items.filter(each=>each.title.toLowerCase().includes(search.toLowerCase()))
        setStore(sol)
    }

    const uniqueCategories=[...new Set(items.map(each=>each.category))]
    //console.log(uniqueCategories)

    useEffect(()=>{
        localStorage.setItem('search',JSON.stringify(search))
        localStorage.setItem('store',JSON.stringify(store))
    },[search,store])



    useEffect(()=>{
        let ApiItems=[...items]
        //ratings
        if(ratings){
            ApiItems=ApiItems.filter(each=>each.rating.rate>=ratings)
        }

        //sorting by price
        if(sortings==='asc'){
            ApiItems.sort((a,b)=>a.price-b.price)
        }else if(sortings==='desc'){
            ApiItems.sort((a,b)=>b.price-a.price)
        }

        //categories
        if(categories.length>0){
            ApiItems=ApiItems.filter(each=>categories.includes(each.category))
        }

        //here we can save in localstorage
        
        localStorage.setItem('sortings',JSON.stringify(sortings))
        localStorage.setItem('ratings',JSON.stringify(ratings))
        localStorage.setItem('categories',JSON.stringify(categories))

        setStore(ApiItems)
    },[ratings,sortings,categories,items])


    const clearFilters=()=>{
        setSearch('')
        setCategories('')
        setRatings('')
        setSortings('')

        localStorage.removeItem('search')
        localStorage.removeItem('sortings')
        localStorage.removeItem('ratings')
        localStorage.removeItem('categories')
    }




    return(
        <div className="arrangeEl34" >
            <Filters
                searchFunction={searchFunction}
                search={search}
                setSearch={setSearch}

                ratings={ratings}
                setRatings={setRatings}

                sortings={sortings}
                setSortings={setSortings}

                categories={categories}
                setCategories={setCategories}
                uniqueCategories={uniqueCategories}

                clearFilters={clearFilters}
            />
            <div style={{marginLeft:'300px'}} >
            {loading?(<div style={{marginLeft:'90px'}} ><p>Loading...please wait</p> <button onClick={()=>{window.location.reload()}} >Refresh</button></div>):(<ul>
                {store.map(eachItem=>(
                    <li style={{listStyleType:'none'}} key={eachItem.id} >
                        <Link style={{textDecoration:'none'}} to={`/products/${eachItem.id}`} >
                        <img className="imageEl" alt={eachItem.title} src={eachItem.image}/>
                        <p>{eachItem.title}</p>
                        <p>{eachItem.description}</p>
                        <p>Price:{eachItem.price}RS./-</p>
                        <p>Rating:{eachItem.rating.rate}</p>
                        <p>category:{eachItem.category}</p>
                        </Link>
                    </li>
                ))}
                {store.length===0 && <p>No Products Found!</p> }
            </ul>)}
            </div>
        </div>
    )
}

export default Products