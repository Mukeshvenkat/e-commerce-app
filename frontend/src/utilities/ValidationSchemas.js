import * as Yup from 'yup'

export const LOGIN_SCHEMA = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export const CHECKOUT_SCHEMA = Yup.object({
  name: Yup.string().required('Name is required'),
  address: Yup.string().required('Address is required'),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  zip: Yup.string()
    .required('Zip code is required')
    .matches(/^[0-9]{5,6}$/, 'Invalid zip code'),
  paymentMethod: Yup.string().required('Please select a payment method'),
});