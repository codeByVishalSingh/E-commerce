import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () =>{

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {Login} = useContext(AuthContext)
    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try {
            const res = await fetch('/api/auth/login',{
                method: 'POST',
                headers: {'Content-type ': 'application-json'},
                body: JSON.stringify({email,password})
            });
            const data = await res.json();
            if(res.ok){
                Login(data)
                navigate("/");
            }
            else{
                  alert(data.message);
            }
        } catch (error) {
            console.log(error);
            
        }
    }
    return (
        <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Login</h2>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" className="btn">Login</button>
        <p>Don't have an account? <Link to="/register">Register</Link></p>
      </form>
    </div>
    )
}
export default Login;