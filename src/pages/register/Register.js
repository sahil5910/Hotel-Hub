import { useState } from "react";
import "./register.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const [loading,setLoading] = useState(false);
    const [error, setError] = useState(false);

    const [credentials, setCredentials] = useState({
        username: undefined,
        email:undefined,
        password: undefined
    });
    const handleChange = (e) => {
        setCredentials(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }
    const handleClick = async (e)=>{
        // to prevent page from refreshing
        e.preventDefault();

        try {
            setLoading(true);
            const res = await axios.post("/auth/register",credentials)
            setLoading(false);
            navigate("/login");
            
        } catch (error) {
            setError(error);
        }

    }
  return (
    <>
    <div class="bg-image"></div>
    <div className="login logout">
        
        <div className="lContainer">
            <div className="heading"><i class="fa-regular fa-hotel icom"></i>HotelHub</div>
            <input type="text" placeholder="UserName " id="username" name="username" onChange={handleChange} className="lInput"></input>
            <input type="email" placeholder="Email " id="email" name="email" onChange={handleChange} className="lInput"></input>
            
            <input type="password" placeholder="Enter Password " id="password" name="password" onChange={handleChange} className="lInput"></input>
            <button type="button" onClick={handleClick} disabled={loading} className="btn btn-outline-light">Register</button>

            {error && <span className="errormsg">{error.message}</span>}
        </div>

    </div>
    </>
  )
}

export default Register
