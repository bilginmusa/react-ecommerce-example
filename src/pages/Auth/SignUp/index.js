import {
  Flex,
  Button,
  Box,
  Input,
  FormLabel,
  FormControl,
  Heading,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { fetchRegister } from '../../../api';
import validationSchema from './validations';

import { useAuth } from '../../../contexts/AuthContext';

function SignUp({ history }) {
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: 'a@a.com',
      password: '123456',
    },
    validationSchema,
    onSubmit: async (values, bag) => {
      try {
        const registerData = await fetchRegister(values);
        login(registerData);
        history.push('/profile');
        console.log(registerData);
      } catch (error) {
        bag.setErrors({ general: error.response.data.message });
      }
    },
  });

  return (
    <div>
      <Flex align="center" width="full" justifyContent="center">
        <Box pt={10}>
          <Box textAlign="center">
            <Heading>Sign Up</Heading>
          </Box>
          <Box my={5}>
            {formik.errors.general && (
              <Alert status="error">
                <AlertIcon />
                {formik.errors.general}
              </Alert>
            )}
          </Box>
          <Box my={5} textAlign="left">
            <form onSubmit={formik.handleSubmit}>
              <FormControl>
                <FormLabel>E-mail</FormLabel>
                <Input
                  type="text"
                  name="email"
                  isInvalid={formik.touched.email && formik.errors.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
              </FormControl>

              <FormControl mt="4">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  isInvalid={formik.touched.password && formik.errors.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
              </FormControl>

              <Button mt={4} width="full" type="submit">
                Sign Up
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </div>
  );
}

export default SignUp;
