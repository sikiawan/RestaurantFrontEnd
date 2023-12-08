import { GetServerSideProps, NextPage } from "next";
import { getSession, signIn, signOut, useSession } from "next-auth/react";
import { FormEventHandler, useEffect, useState } from "react";
import Jwt from 'jsonwebtoken';
import { useRouter } from 'next/router';
import { Input, Link, Checkbox, Button } from "@nextui-org/react";
import { LockIcon, MailIcon } from "@/components/icons/icons";

interface Props { }
const SignIn: NextPage = (props): JSX.Element => {

  const router = useRouter();
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState<string | null>(null);

  const { data: session } = useSession();
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
      const resp = await fetchResponse.json();
      console.log(resp);
      if (!fetchResponse.ok) {
        debugger;
        if(resp.errors){
          setEmailError(resp.errors.Email)
          setPasswordError(resp.errors.Password)
        }
        else{
          setEmailError('');
          setPasswordError('');
        }
        setError(resp.message)
        throw new Error(`Request failed with status: ${fetchResponse.status}`);
      }
      const json = Jwt.decode(resp.message) as { [key: string]: string };
      console.log(json);
      signIn("credentials", {
        email: json['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
        name: json['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
        role: json['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
        permission: json['permission'],
        redirect: false,
      }).then(() => {
        router.push('/');
      });
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white dark:bg-gray-900 py-8 px-4 md:px-8 lg:px-16 m-2 rounded-2xl shadow-md max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
        {error && (
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">Error!</span> {error}
        </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <Input
              autoFocus
              endContent={<MailIcon className="text-2xl text-default-400" />}
              onChange={({ target }) => setUserInfo({ ...userInfo, email: target.value })}
              label="Email"
              placeholder="Enter your email"
              variant="bordered"
              fullWidth
              errorMessage={emailError}
            />
          </div>
          <div className="mb-6">
            <Input
              endContent={<LockIcon className="text-2xl text-default-400" />}
              onChange={({ target }) => setUserInfo({ ...userInfo, password: target.value })}
              label="Password"
              placeholder="Enter your password"
              type="password"
              errorMessage={passwordError}
              variant="bordered"
              fullWidth
            />
            <div className="flex items-center justify-between mt-2">
              <Checkbox className="text-sm">Remember me</Checkbox>
              <Link color="primary" href="#" size="sm">
                Forgot password?
              </Link>
            </div>
          </div>
          <Button color="primary" type="submit" fullWidth>
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });

  if (session && res) {
    res.writeHead(302, { Location: '/' });
    res.end();
  }

  return {
    props: {},
  };
};
export default SignIn;
