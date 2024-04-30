import { useFormik } from "formik"
import { Link, useNavigate } from "react-router-dom"
import React from 'react'
import { Box, Button, Container, TextField, Typography } from "@mui/material"
import { useAuthServiceContext } from "../context/AuthContext"
import { loginSchema } from "../schema/formValidation"
import PrimaryAppBar from "./templates/PrimaryAppBar"

const Login = () => {

    const navigate = useNavigate()
    const { login, isLoggedIn } = useAuthServiceContext()

    React.useEffect(() => {
        if (isLoggedIn) {
            navigate('/')
        }
        }, [])
    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: loginSchema,
        onSubmit: async (values) => {
            const { username, password } = values
            const res = await login(username, password)
            if (res === 401){
                formik.errors.username = "Invalid credentials"
                formik.errors.password = "Invalid credentials"
            }
            else {
                navigate("/")
            }
        },
    })

    return (
        <>
        <PrimaryAppBar/>
        <Container component="main" maxWidth="xs">
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                marginTop: 8

            }}>
            <Typography
                variant="h1"
                fontWeight={400}
                textAlign="center"
            >
                Login
            </Typography>
            <Box component="form" onSubmit={formik.handleSubmit} sx={{
                mt: 2,
                padding: 3,
                display: "flex",
                flexDirection: "column",
                gap: 3,
                justifyContent: "center",
                alignItems: "center",
            }}>
                <TextField
                    error={formik.touched.username && Boolean(formik.errors.username)}
                    helperText={formik.touched.username && (formik.errors.username)}
                    autoFocus
                    fullWidth
                    type="text"
                    label="Username"
                    id="username"
                    name="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    autoComplete="true"
                />
                <TextField
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    fullWidth
                    type="password"
                    label="Password"
                    id="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                <Typography>
                    Don't have an account? <Link to="/register">Sign up</Link>
                </Typography>
                <Button
                    variant="outlined"
                    type="submit"
                    size="large"
                    sx={{
                        width: "40%",
                        mt: 2,
                    }}
                >
                    Submit
                </Button>
            </Box>
        </Box>
        </Container>
        </>
    )
}

export default Login