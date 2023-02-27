import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { Box, Text, Button } from '@chakra-ui/react';
import moment from 'moment';
import ImageGallery from 'react-image-gallery';
import { useBasket } from '../../contexts/BasketContext';
import { fetchProduct } from '../../api';

function ProductDetail() {
  const { product_id } = useParams();
  const { addToBasket, items } = useBasket();

  const { isLoading, isError, data, error } = useQuery(['product', product_id], () =>
    fetchProduct(product_id),
  );

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  const findBasketItem = items.find((item) => item._id === product_id);
  const images = data.photos.map((url) => ({ original: url }));

  return (
    <div>
      <Button
        colorScheme={findBasketItem ? 'pink' : 'green'}
        variant="solid"
        onClick={() => addToBasket(data, findBasketItem)}
      >
        {findBasketItem ? 'Remove from basket' : 'Add to basket'}
      </Button>

      <Text as="h2" fontSize="2xl">
        {data.title}
      </Text>
      <Text fontSize="sm">{moment(data.createdAt).format('DD/MM/YYYY')}</Text>
      <p>{data.description}</p>

      <Box margin="10">
        <ImageGallery showThumbnails={false} showPlayButton={false} items={images} />
      </Box>
    </div>
  );
}

export default ProductDetail;
