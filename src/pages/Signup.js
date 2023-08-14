import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import loginImage from "../assets/login.svg";
import { createUser, googleLogin } from "../redux/features/auth/authSlice";
const Signup = () => {
  const { handleSubmit, register, reset, control } = useForm();
  const password = useWatch({ control, name: "password" });
  const confirmPassword = useWatch({ control, name: "confirmPassword" });
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(true);

  const dispatch = useDispatch();
  const { isError, error, user: { email }, isLoading } = useSelector(state => state.auth);
  console.log(isError, error, email, isLoading);

  useEffect(() => {
    if (
      password !== undefined &&
      password !== "" &&
      confirmPassword !== undefined &&
      confirmPassword !== "" &&
      password === confirmPassword
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [password, confirmPassword]);

  const onSubmit = (data) => {
    // console.log(data);
    dispatch(createUser(data));
  };


  useEffect(() => {
    if (isError) {
      toast.error(error)
    }
  }, [isError, error])



  useEffect(() => {
    if (!isLoading && email) {
      console.log(`${email} sign up`);
      navigate('/register');
      toast.success("Sign up Complete Successfully..!")
    }
  }, [isLoading, email, navigate])

  return (
    <div className='flex h-screen items-center pt-14'>
      <div className='w-1/2'>
        <img src={loginImage} className='h-full w-full' alt='' />
      </div>
      <div className='w-1/2 grid place-items-center'>
        <div className='bg-[#FFFAF4] rounded-lg grid place-items-center p-10'>
          <h1 className='mb-10 font-medium text-2xl'>Sign up</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='space-y-3'>
              <div className='flex flex-col items-start'>
                <label htmlFor='email' className='ml-5'>
                  Email
                </label>
                <input
                  type='email'
                  name='email'
                  id='email'
                  {...register("email")}
                />
              </div>

              <div className='flex flex-col items-start'>
                <label htmlFor='password' className='ml-5'>
                  Password
                </label>
                <input
                  type='password'
                  name='password'
                  id='password'
                  {...register("password")}
                />
              </div>
              <div className='flex flex-col items-start'>
                <label htmlFor='confirm-password' className='ml-5'>
                  Confirm Password
                </label>
                <input
                  type='password'
                  id='confirm-password'
                  {...register("confirmPassword")}
                />
              </div>
              <div className='!mt-8 '>
                <button
                  type='submit'
                  className='font-bold text-white py-3 rounded-full bg-primary w-full disabled:bg-gray-300 disabled:cursor-not-allowed'
                  disabled={disabled}
                >
                  Sign up
                </button>
              </div>
              <div>
                <p>
                  Already have an account?{" "}
                  <span
                    className='text-primary hover:underline cursor-pointer'
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </span>
                </p>
              </div>
              <div className='relative !mt-4'>
                <button
                  onClick={() => dispatch(googleLogin())}
                  type='button'
                  className='font-bold text-white py-3 rounded-full bg-primary w-full'
                >
                  Google Signup
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
