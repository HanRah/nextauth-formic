import React, { useState } from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';

import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { signIn, getCsrfToken } from "next-auth/react"

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const defaultTheme = createTheme();

export default function SignIn({ csrfToken }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            username: data.get('username'),
            password: data.get('password'),
        });
    };

    const router = useRouter();
    const [error, setError] = React.useState<string | null>();

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="username "
                            name="username"
                            autoComplete="username"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}
// export default function SignIn({ csrfToken }: InferGetServerSidePropsType<typeof getServerSideProps>) {
//     const router = useRouter();
//     const [error, setError] = React.useState<string | null>();
//     return (
//         <Formik
//             initialValues={{ username: '', password: '', tenantKey: '' }}
//             validationSchema={Yup.object({
//                 username: Yup.string()
//                     .min(2, 'Too Short!')
//                     .max(50, 'Too Long!')
//                     .required('Required'),
//                 password: Yup.string().required('Please enter your password'),
//             })}
//             onSubmit={async (values, { setSubmitting }) => {
//                 const res = await signIn('credentials', {
//                     redirect: false,
//                     username: values.username,
//                     password: values.password,
//                     callbackUrl: `${window.location.origin}`,
//                 });
//                 if (res?.error) {
//                     setError(res?.error);
//                 } else {
//                     setError(null);
//                 }
//                 if (res?.url) router.push(res?.url);
//                 setSubmitting(false);
//             }}
//         >
//             {(formik) => (
//                 <form onSubmit={formik.handleSubmit}>
//                     <div
//                         className="bg-red-400 flex flex-col items-center 
//             justify-center min-h-screen py-2 shadow-lg">
//                         <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
//                             <input
//                                 name="csrfToken"
//                                 type="hidden"
//                                 defaultValue={csrfToken}
//                             />

//                             <div className="text-red-400 text-md text-center rounded p-2">
//                                 {error}
//                             </div>
//                             <div className="mb-4">
//                                 <label
//                                     htmlFor="username"
//                                     className="uppercase text-sm text-gray-600 font-bold"
//                                 >
//                                     Username
//                                     <Field
//                                         name="username"
//                                         aria-label="enter your username"
//                                         aria-required="true"
//                                         type="text"
//                                         className="w-full bg-gray-300 text-gray-900 mt-2 p-3"
//                                     />
//                                 </label>

//                                 <div className="text-red-600 text-sm">
//                                     <ErrorMessage name="username" />
//                                 </div>
//                             </div>
//                             <div className="mb-6">
//                                 <label
//                                     htmlFor="password"
//                                     className="uppercase text-sm text-gray-600 font-bold"
//                                 >
//                                     password
//                                     <Field
//                                         name="password"
//                                         aria-label="enter your password"
//                                         aria-required="true"
//                                         type="password"
//                                         className="w-full bg-gray-300 text-gray-900 mt-2 p-3"
//                                     />
//                                 </label>

//                                 <div className="text-red-600 text-sm">
//                                     <ErrorMessage name="password" />
//                                 </div>
//                             </div>
//                             <div className="flex items-center justify-center">
//                                 <button
//                                     type="submit"
//                                     className="bg-green-400 text-gray-100 p-3 rounded   -lg w-full"
//                                 >
//                                     {formik.isSubmitting ? 'Please wait...' : 'Sign In'}
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </form>
//             )}
//         </Formik>
//     )
// }

export async function getServerSideProps(context: GetServerSidePropsContext) {
    return {
        props: {
            csrfToken: await getCsrfToken(context),
        },
    }
}