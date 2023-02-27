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
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { fetchLogin } from "../../../api";
import validationSchema from "./validations";

import { useAuth } from "../../../contexts/AuthContext";

function SignIn({ history }) {
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: "a@a.com",
      password: "123456",
    },
    validationSchema,
    onSubmit: async (values, bag) => {
      try {
        const loginData = await fetchLogin(values);
        login(loginData);
      } catch (error) {
        console.log(error.response.data);
        bag.setErrors({ general: error.response.data.message });
      }
    },
  });

  return (
    <div>
      <Flex align="center" width="full" justifyContent="center">
        <Box pt={10}>
          <Box textAlign="center">
            <Heading>Sign In</Heading>
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
                Sign In
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </div>
  );
}

export default SignIn;
