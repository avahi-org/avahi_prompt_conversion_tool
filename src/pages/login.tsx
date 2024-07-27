/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable-next-line import/no-extraneous-dependencies */
import axios from 'axios';
import { useFormik } from 'formik';
import { AnimatePresence, motion } from 'framer-motion';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import nookies, { setCookie } from 'nookies';
import React, { useCallback, useState } from 'react';
import { Eye, EyeOff, Lock, Mail } from 'react-feather';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { Meta } from '@/layouts/Meta';

const Login = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const handleLogin = async (username: string, password: string) => {
    try {
      const response = await axios.post('/api/login', { username, password });
      setCookie(null, 'token', response.data.token, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });
      router.push('/auth');
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  const { errors, handleSubmit, handleBlur, handleChange, values, touched } =
    useFormik({
      initialValues: {
        email: '',
        password: '',
      },
      validationSchema: Yup.object({
        // email: Yup.string().email('Invalid email address').required('Required'),
        email: Yup.string().required('Required'),
        password: Yup.string().required('Required'),
      }),
      onSubmit: (value) => {
        handleLogin(value.email, value.password);
      },
    });

  return (
    <div
      className="font-roboto page-break w-full text-gray-700 antialiased"
      id="target-main"
    >
      <Meta title="Login" description="Login" />

      <div className="flex flex-1 flex-col bg-gray-100 transition-colors duration-200">
        <main className="flex-1 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-xl space-y-6 rounded-xl bg-white p-6 shadow-lg transition-all duration-500 sm:p-8">
              <div className="text-center">
                <h2 className="mb-2 font-poppins text-2xl font-semibold text-gray-900 sm:text-3xl">
                  Welcome Avahi
                </h2>
                <p className="font-poppins text-sm text-gray-600 sm:text-base">
                  Sign in to your account
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative pb-2">
                  <div className="group relative mb-0.5">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-all duration-300 group-focus-within:text-blue-500">
                      <Mail size={20} />
                    </div>
                    <input
                      type="text"
                      placeholder="Email"
                      name="email"
                      className="w-full rounded-md border border-gray-200 bg-white py-2 pl-10 pr-3 font-poppins text-sm text-gray-900 transition-all duration-300 placeholder:text-base focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 md:text-lg"
                      aria-label="Email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />
                  </div>

                  <AnimatePresence>
                    {touched.email && errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute text-xs text-red-500"
                      >
                        {errors.email}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <div className="relative pb-1">
                  <div className="group relative mb-0.5">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-all duration-300 group-focus-within:text-blue-500">
                      <Lock size={20} />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      name="password"
                      className="w-full rounded-md border border-gray-200 bg-white py-2 pl-10 pr-3 font-poppins text-sm text-gray-900 transition-all duration-300 placeholder:text-base focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 md:text-lg"
                      aria-label="Password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                    />

                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors duration-300 hover:text-blue-500 focus:outline-none"
                      aria-label="Show password"
                    >
                      {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                    </button>
                  </div>

                  <AnimatePresence>
                    {touched.password && errors.password && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute  text-xs text-red-500"
                      >
                        {errors.password}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full rounded-md bg-blue-600 px-4 py-2 font-poppins text-sm text-white transition-all duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:text-base dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-400"
                >
                  Sign In
                </motion.button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Login;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const accessToken = nookies.get(ctx)?.token;

  if (accessToken) {
    return {
      redirect: {
        source: ctx.req.url,
        destination: `/auth`,
      },
      props: {},
    };
  }
  return {
    props: {},
  };
};
