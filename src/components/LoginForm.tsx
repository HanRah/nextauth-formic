'use client'

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";

import { signIn, getCsrfToken } from "next-auth/react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";



export default function LoginForm({ csrfToken }: { csrfToken?: string }) {
    const router = useRouter();
    const [error, setError] = React.useState<string | null>();
    const formik = useFormik({
        initialValues: { username: "", password: "", tenantKey: "" },
        validationSchema: Yup.object({
            username: Yup.string()
                .min(2, "Too Short!")
                .max(50, "Too Long!")
                .required("Required"),
            password: Yup.string().required("Please enter your password"),
        }),
        onSubmit: async (values, { setSubmitting }) => {
            const res = await signIn("credentials", {
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
        },
    });

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
                    Sign in
                </Typography>
                <form onSubmit={formik.handleSubmit} >
                    <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                    <TextField
                        fullWidth
                        id="username"
                        name="username"
                        label="Username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.username && Boolean(formik.errors.username)}
                        helperText={formik.touched.username && formik.errors.username}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button color="primary" variant="contained" fullWidth type="submit" sx={{ mt: 3, mb: 2 }}>
                        Submit
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
                </form>
            </Box>
        </Container >
    );
}


