import Products from "./Products"


const Home=()=>{

    console.log('home page')

    return(
        <div className="universal">
            <h1>This is a Home Page</h1>
            <p>You can add any of your products to access or show at intitial stage of rendering.</p>
            <Products/>
        </div>
    )
}

export default Home