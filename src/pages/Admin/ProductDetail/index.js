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
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchProduct, updateProduct } from "../../../api";
import { Formik } from "formik";
import editSchema from "./validations";
import { message } from "antd";

function ProductDetail() {
  const { product_id } = useParams();

  const { isLoading, isError, data, error } = useQuery(
    ["admin:product", product_id],
    () => fetchProduct(product_id)
  );

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  console.log(data);

  const handleSubmit = async (values, bag) => {
    console.log(values);
    message.loading({ content: "Loading...", key: "product_update" });

    try {
      await updateProduct(values, product_id);
      message.success({
        content: "The product successfully updated.",
        key: "product_update",
        duration: 2,
      });
    } catch (e) {
      message.error("The product does not updated.");
    }
  };

  return (
    <div>
      <Text fontSize="2xl">Edit</Text>

      <Formik
        initialValues={{
          title: data.title,
          description: data.description,
          price: data.price,
          photos: data.photos,
        }}
        validationSchema={editSchema}
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
                  <FormControl>
                    <FormLabel>Photos</FormLabel>
                    {values.photos.map((photo, item) => (
                      <Input
                        type="text"
                        name={`photos${item}`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={photo}
                        disabled={isSubmitting}
                      />
                    ))}
                  </FormControl>

                  <Button
                    mt={4}
                    width="full"
                    type="submit"
                    isLoading={isSubmitting}
                  >
                    Update
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

export default ProductDetail;
