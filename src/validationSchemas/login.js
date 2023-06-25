import * as yup from 'yup';
export const loginValidationSchema = yup.object().shape({
  email: yup.string().email().required('E-mail es required'),
  password: yup
    .string()
    .min(5, 'Too Short!')
    .max(1000, 'Too Long!')
    .required('Password is required'),
});
