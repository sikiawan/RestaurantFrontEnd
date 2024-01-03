import { Input, Link, Checkbox, Button } from "@nextui-org/react";
import { LockIcon, MailIcon } from "@/components/icons/icons";

const index = () => {
  return (
    <div className='bg-[#f5f6f9] min-h-screen flex items-center justify-center'>
      <img className='hidden md:block float-left mt-10 ml-10 fixed left-0 h-[450px]' src='/POS.png' />
      <div className='bg-white dark:bg-gray-900 rounded-tl-2xl rounded-bl-2xl shadow-md w-full md:w-[500px] h-screen fixed right-0 items-center justify-center flex flex-col'>
        <div className="py-8 px-4 md:px-8 lg:px-16 max-w-md w-full">
          <h2 className="text-3xl mb-6 text-left text-color-Cyan">Login to POS</h2>
          <hr className="my-4 border-t border-gray-300" />
          {/* {error && (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <span className="font-medium">Error!</span> {error}
            </div>
          )} */}
          <form>
            <div className="mb-6">
              <Input
                autoFocus
                endContent={<MailIcon className="text-2xl text-default-400" />}
                // onChange={({ target }) => setUserInfo({ ...userInfo, email: target.value })}
                label="Email"
                placeholder="Enter your email"
                variant="bordered"
                fullWidth
                // errorMessage={emailError}
              />
            </div>
            <div className="mb-6">
              <Input
                endContent={<LockIcon className="text-2xl text-default-400" />}
                // onChange={({ target }) => setUserInfo({ ...userInfo, password: target.value })}
                label="Password"
                placeholder="Enter your password"
                type="password"
                // errorMessage={passwordError}
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
    </div>
  );
};

export default index;
