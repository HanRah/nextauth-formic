import React, { useState } from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';

import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { signIn, getCsrfToken } from "next-auth/react"

// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Grid from '@material-ui/core/Grid';
// import Paper from '@material-ui/core/Paper';
// import Avatar from '@material-ui/core/Avatar';
// import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';
// import Link from '@material-ui/core/Link';


export default function SignIn({ csrfToken }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const router = useRouter();
    const [error, setError] = React.useState<string | null>();
    return (
        <Formik
            initialValues={{ username: '', password: '', tenantKey: '' }}
            validationSchema={Yup.object({
                username: Yup.string()
                    .min(2, 'Too Short!')
                    .max(50, 'Too Long!')
                    .required('Required'),
                password: Yup.string().required('Please enter your password'),
            })}
            onSubmit={async (values, { setSubmitting }) => {
                const res = await signIn('credentials', {
                    redirect: false,
                    username: values.username,
                    password: values.password,
                    callbackUrl: `${window.location.origin}`,
                });
                if (res?.error) {
                    setError(res?.error);
                } else {
                    setError(null);
                }
                if (res?.url) router.push(res?.url);
                setSubmitting(false);
            }}
        >
            {(formik) => (
                <form onSubmit={formik.handleSubmit}>
                    <div
                        className="bg-red-400 flex flex-col items-center 
            justify-center min-h-screen py-2 shadow-lg">
                        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                            <input
                                name="csrfToken"
                                type="hidden"
                                defaultValue={csrfToken}
                            />

                            <div className="text-red-400 text-md text-center rounded p-2">
                                {error}
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="username"
                                    className="uppercase text-sm text-gray-600 font-bold"
                                >
                                    Username
                                    <Field
                                        name="username"
                                        aria-label="enter your username"
                                        aria-required="true"
                                        type="text"
                                        className="w-full bg-gray-300 text-gray-900 mt-2 p-3"
                                    />
                                </label>

                                <div className="text-red-600 text-sm">
                                    <ErrorMessage name="username" />
                                </div>
                            </div>
                            <div className="mb-6">
                                <label
                                    htmlFor="password"
                                    className="uppercase text-sm text-gray-600 font-bold"
                                >
                                    password
                                    <Field
                                        name="password"
                                        aria-label="enter your password"
                                        aria-required="true"
                                        type="password"
                                        className="w-full bg-gray-300 text-gray-900 mt-2 p-3"
                                    />
                                </label>

                                <div className="text-red-600 text-sm">
                                    <ErrorMessage name="password" />
                                </div>
                            </div>
                            <div className="flex items-center justify-center">
                                <button
                                    type="submit"
                                    className="bg-green-400 text-gray-100 p-3 rounded   -lg w-full"
                                >
                                    {formik.isSubmitting ? 'Please wait...' : 'Sign In'}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            )}
        </Formik>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    return {
        props: {
            csrfToken: await getCsrfToken(context),
        },
    }
}