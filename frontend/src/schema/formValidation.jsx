import * as yup from "yup"

export const loginSchema = yup.object().shape({
    username: yup.string().required("Required"),
    password: yup.string().required("Required"),
});

export const registerScehma = yup.object().shape({
    username: yup.string().required("Required"),
    password: yup.string().required("Required"),
    confirm: yup.string().oneOf([yup.ref("password"), null], "Passwords must match"),
});