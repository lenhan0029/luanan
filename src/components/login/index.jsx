import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm'

export default function Login() {
  const navigate = useNavigate();
  useEffect(() => {
    let token = localStorage.getItem('token');
  if(token != null){
    navigate('/home/thoikhoabieu');
  }
  },[])
  
  return (
    <div>
        <div style={{width: "50%", margin: "0% 35%", padding: "16.5% 0"}}> 
            
            <LoginForm />
        </div>
    </div>
  )
}
