import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
const validationSchema = Yup.object({
  email: Yup.string().email('Email not valid'),
  phoneNumber: Yup.string()
    .matches(/^\d+$/, 'only numbers')
    .required('enter phone number'),
  password: Yup.string().required('enter number'),
});

const Login = () => {
  const { register, handleSubmit, watch, errors } = useForm({
    // resolver: yupResolver(schema),
  });
  return <div>اه</div>;
};

export default Login;
