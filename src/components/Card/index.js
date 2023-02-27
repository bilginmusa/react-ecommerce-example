import { Box, Image, Button } from '@chakra-ui/react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useBasket } from '../../contexts/BasketContext';

function Card({ item }) {
  const { addToBasket, items } = useBasket();
  const findBasketItem = items.find((basket_item) => basket_item._id === item._id);

  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" p="3">
      <Link to={`/product/${item._id}`}>
        <Image loading={'lazy'} src={item.photos[0]} alt={'product'} />

        <Box p="6">
          <Box d="flex" alignItems="baseline">
            <Box
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
              textTransform="uppercase"
            >
              {moment(item.createdAt).format('DD/MM/YYYY')}
            </Box>
          </Box>

          <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
            {item.title}
          </Box>

          <Box>{item.price} TL</Box>
        </Box>
      </Link>

      <Button
        colorScheme={findBasketItem ? 'pink' : 'green'}
        variant="solid"
        onClick={() => addToBasket(item, findBasketItem)}
      >
        {findBasketItem ? 'Remove from basket' : 'Add to basket'}
      </Button>
    </Box>
  );
}

export default Card;
