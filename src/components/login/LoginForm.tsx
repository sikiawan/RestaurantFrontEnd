// LoginForm.js
import React, { useState } from 'react';
import { json } from 'stream/consumers';
import { redirect } from 'next/navigation'
import { useRouter } from 'next/router';
import  Jwt  from 'jsonwebtoken';
const LoginForm = () => {
  //const navigate = useNavigate();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleLogin = ()=>{
        let obj = {
            "userName": "sadmin",
            "email": email,
            "password": password
          }
          fetch("https://localhost:7160/api/Auth/Authenticate",{
            method : 'POST',
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify(obj)
          })
      .then((res) => {
        if (!res.ok) {
            debugger;
          throw new Error(`Request failed with status: ${res.status}`);
        }
        return res.json();
        
      })
      .then((resp) => {
        sessionStorage.setItem('userName', email);
        sessionStorage.setItem('jwttoken', resp.message);
        const json = Jwt.decode(resp.message) as {[key: string]: string};
        const role = json['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
        if(role == 'Admin'){
          router.push('/')
        }
        else if (role == 'SuperAdmin'){
          router.push('/dashboard')
        }
      })
      .catch((error) => {
        console.error('Fetch error:', error.message);
      });
    }
  return (
    <div className="min-h-full flex items-center justify-center mt-14">
      <div className="bg-white dark:bg-gray-900 p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full border p-2 rounded"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}

            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full border p-2 rounded"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
          type='button'
            onClick={handleLogin}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
