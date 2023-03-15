import logo from './logo.jpg'

export default function Header(){
    return(
        <header>
            <img src={logo} className='logo'></img>
            <nav>
                <a href=''>Login</a>
                <a href=''>Register</a>
            </nav>
        </header>
    )
}
