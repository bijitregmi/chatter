import { useFormik } from "formik"
import { useNavigate } from "react-router-dom"
import React from 'react'
import { Box, Button, TextField, Typography } from "@mui/material"
import { useAuthServiceContext } from "../context/AuthContext"

const Login = () => {

    const navigate = useNavigate()
    const { login } = useAuthServiceContext()
    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        onSubmit: async (values) => {
            const { username, password } = values
            const res = await login(username, password)
            if (res) {
                console.log(res)
            }
            else {
                navigate("/test")
            }
        }
    })

    return (
        <Box>
            <Typography
                variant="h2"
            >
                Login
            </Typography>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    type="text"
                    label="Username"
                    id="username"
                    name="username"
                    size="small"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    autoComplete="true"
                />
                <TextField
                    type="password"
                    label="Password"
                    id="password"
                    name="password"
                    size="small"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                />
                <Button
                    variant="outlined"
                    type="submit"
                >
                    Submit
                </Button>
            </form>
        </Box>
    )
}

export default Login