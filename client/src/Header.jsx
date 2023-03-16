import logo from './logo.jpg'
import { Link } from 'react-router-dom'

export default function Header(){
    return(
        <header>
            <Link to="/"><img src={logo} className='logo'></img></Link>
            <nav>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </nav>
        </header>
    )
}
