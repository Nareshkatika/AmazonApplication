import{Link} from 'react-router-dom'
import './style.css'
import { useSelector } from 'react-redux'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
const Header=()=>{
    const navigateTo=useNavigate()

    const LogoutBtn=()=>{
        Cookies.remove('jwt_token')
        navigateTo('/login')
    }

    const {AllItems}=useSelector((state)=>state.shopping)

    return(
        <div className='arrangeEl1'>
                <nav>
                <ul className='arrangeEl2' >
                    <li className='listEl' >
                        <Link className='listText' to='/' >Home</Link>
                    </li>
                    <li className='listEl' >
                        <Link className='listText' to='/contacts' >contacts</Link>
                    </li>
                    <li className='listEl' >
                        <Link  className='listText' to='/cart' >Cart
                        <span style={{color:'black',fontFamily:'roboto',fontWeight:'bold'}} >{AllItems.length}</span>
                        </Link>
                    </li>
                </ul>
                </nav>
                <div style={{marginTop:'20px'}}>
                <button onClick={LogoutBtn} style={{cursor:'pointer', height:'23px',marginRight:'40px'}} >Logout</button>
                </div>
        </div>
    )
}

export default Header