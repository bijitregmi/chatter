import { useFormik } from "formik"
import { useNavigate } from "react-router-dom"
import React from 'react'
import { Box, Button, Container, TextField, Typography } from "@mui/material"
import { useAuthServiceContext } from "../context/AuthContext"
import { registerScehma } from "../schema/formValidation"

const Register = () => {

    const navigate = useNavigate()
    const { register } = useAuthServiceContext()

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
            confirm: "",
        },
        validationSchema: registerScehma,
        onSubmit: async (values) => {
            const { username, password } = values
            const res = await register(username, password)
            if (res === 409){
                formik.errors.username = "Username already exists"
            }
            else if (res === 400){
                formik.errors.username = "Username is not allowed"
            }
            else {
                navigate("/login")
            }
        },
    })

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                marginTop: 4

            }}>
            <Typography
                variant="h1"
                fontWeight={400}
                textAlign="center"
            >
                Register
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
                <TextField
                    error={formik.touched.confirm && Boolean(formik.errors.confirm)}
                    helperText={formik.touched.confirm && formik.errors.confirm}
                    fullWidth
                    type="password"
                    label="Confirm Password"
                    id="confirm"
                    name="confirm"
                    value={formik.values.confirm}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
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
    )
}

export default Register