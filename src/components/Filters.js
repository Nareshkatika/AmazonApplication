import './style.css'

const Filters=(props)=>{
    const{ratings,setRatings,sortings,setSortings,searchFunction,search,setSearch,uniqueCategories,categories,setCategories,clearFilters}=props

    const onChangeCategories=(each)=>{
        setCategories(categories.includes(each)?categories.filter(a=>a!==each):[...categories,each])
    }

    const categoriesEl=()=>{
        return(
            <div style={{display:'flex',flexDirection:'column'}} >
                {uniqueCategories.map(eachItem=>(
                    <label key={eachItem} >
                        <input onChange={()=>onChangeCategories(eachItem)} checked={categories.includes(eachItem)} type="checkbox" />{eachItem}
                    </label>
                ))}
            </div>
        )
    }

    const searchItems=()=>{
        return(
            <div>
                <input placeholder="search items" value={search} onChange={(event)=>setSearch(event.target.value)} />
                <button onClick={searchFunction} >search</button>
            </div>
        )
    }

    const SortByPrice=()=>{
        return(
            <div>
                <select value={sortings} onChange={(event)=>setSortings(event.target.value)} >
                    <option value='select'>select</option>
                    <option value='asc'>Low</option>
                    <option value='desc'>High</option>
                </select>
            </div>
        )
    }

    const RatingsEl=()=>{
        return(
            <div>
                {[1,2,3,4,5].map(eachItem=>(
                    <label key={eachItem} >
                        <input checked={eachItem===ratings} type="radio" onChange={()=>setRatings(eachItem)} />{eachItem}
                    </label>
                ))}
            </div>
        )
    }

    return(
        <div className="FiltesBox">
            <h1>Filters</h1>
            {searchItems()}
            <p style={{display:'flex'}} >Price:{SortByPrice()}</p>
            <p style={{display:'flex'}} >Ratings:{RatingsEl()}</p>
            <p style={{display:'flex',flexDirection:'column'}} >Categories:{categoriesEl()}</p>
            <button onClick={clearFilters} >Clear Filters</button>
        </div>
    )
}

export default Filters