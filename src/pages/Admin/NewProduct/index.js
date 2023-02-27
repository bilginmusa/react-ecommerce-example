import {
  Text,
  Button,
  Box,
  Input,
  FormLabel,
  FormControl,
  Textarea,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { saveProduct } from "../../../api";
import { Formik } from "formik";
// import editSchema from "./validations";
import { message } from "antd";

function NewProduct() {
  const handleSubmit = async (values, bag) => {
    console.log(values);
    message.loading({ content: "Loading...", key: "product_save" });

    try {
      const response = await saveProduct(values);
      console.log("Response", response);
      message.success({
        content: "The product successfully saved.",
        key: "product_save",
        duration: 2,
      });
    } catch (e) {
      message.error("The product does not saved.");
    }
  };

  return (
    <div>
      <Text fontSize="2xl">New</Text>

      <Formik
        initialValues={{
          title: "",
          description: "",
          price: "",
        }}
        // validationSchema={editSchema}
        onSubmit={handleSubmit}
      >
        {({
          handleSubmit,
          errors,
          touched,
          handleChange,
          handleBlur,
          values,
          isSubmitting,
        }) => (
          <>
            <Box>
              <Box my={5}>
                {errors.general && (
                  <Alert status="error">
                    <AlertIcon />
                    {errors.general}
                  </Alert>
                )}
              </Box>
              <Box my={5} textAlign="left">
                <form onSubmit={handleSubmit}>
                  <FormControl>
                    <FormLabel>Title</FormLabel>
                    <Input
                      type="text"
                      name="title"
                      isInvalid={touched.title && errors.title}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.title}
                      disabled={isSubmitting}
                    />
                  </FormControl>

                  <FormControl mt="4">
                    <FormLabel>Description</FormLabel>
                    <Textarea
                      name="description"
                      height="180"
                      isInvalid={touched.description && errors.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.description}
                      disabled={isSubmitting}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Price</FormLabel>
                    <Input
                      type="text"
                      name="price"
                      isInvalid={touched.price && errors.price}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.price}
                      disabled={isSubmitting}
                    />
                  </FormControl>

                  <Button
                    mt={4}
                    width="full"
                    type="submit"
                    isLoading={isSubmitting}
                  >
                    Save
                  </Button>
                </form>
              </Box>
            </Box>
          </>
        )}
      </Formik>
    </div>
  );
}

export default NewProduct;
