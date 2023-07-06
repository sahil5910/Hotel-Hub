import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './navbar.css'
import { AuthContext } from '../../context/AuthContext';
const Navbar = () => {
  const {  user } = useContext(AuthContext);
  const navigate = useNavigate();

  const {  loading, error, dispatch } = useContext(AuthContext);

  const handleloginClick = ()=>{
    navigate('/login');
  }
  const handleregisterClick =()=>{
    navigate('/register')
  }

  const handleLogoutclk = (e)=>{
      e.preventDefault();
      dispatch({type:"LOGOUT"})
  }




  return (
    <div className='navbar'>
        <div className='navContainer'>
          <Link to="/" style={{color:"inherit",textDecoration:"none"}}>
            <span className='logo'>HotelHub</span>
            </Link>
            {user ? 
            <div className='loggedIn'>

                <i className="fa-solid fa-user icon"></i>
                
                <div className='usrProfile'>
                {user.username}
                </div>
                <button className="navButton" onClick={handleLogoutclk}>
                  Logout
                </button>
            </div>
            :  <div className="navItems">
                
                <button className='navButton' onClick={handleregisterClick}>Register</button>
                <button className='navButton' onClick={handleloginClick}>Login</button>
            </div>}
        </div>
      
    </div>
  )
}

export default Navbar
