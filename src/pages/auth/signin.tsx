import { NextPage } from "next";
import { signIn } from "next-auth/react";
import { FormEventHandler, useState } from "react";
import Jwt from 'jsonwebtoken';
import { useRouter } from 'next/router';

interface Props { }
const SignIn: NextPage = (props): JSX.Element => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    let obj = {
      "email": userInfo.email,
      "password": userInfo.password
    }

    try {
      const fetchResponse = await fetch("https://localhost:7160/api/Auth/Authenticate", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
      });

      if (!fetchResponse.ok) {
        throw new Error(`Request failed with status: ${fetchResponse.status}`);
      }

      const resp = await fetchResponse.json();

      const json = Jwt.decode(resp.message) as { [key: string]: string };
      console.log(json);
      signIn("credentials", {
        email: json['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
        name: json['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
        role: json['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
        redirect: false,
      }).then(() => {
        router.push('/');
      });
    } catch (error) {
      console.error('Fetch error:');
    }
  };
  return (
    <div className="min-h-full flex items-center justify-center mt-14">
      <div className="bg-white dark:bg-gray-900 p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
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
              onChange={({ target }) =>
                setUserInfo({ ...userInfo, email: target.value })
              }
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
              onChange={({ target }) =>
                setUserInfo({ ...userInfo, password: target.value })
              } />
          </div>
          <input
            type='submit'
            value='login'
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          />
        </form>
      </div>
    </div>
  );
};

export default SignIn;
